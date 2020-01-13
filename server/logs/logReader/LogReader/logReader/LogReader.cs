using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Windows;

namespace logReader
{
    public class LogReader : IDisposable
    {

        #region Private Fields

        private StreamReader _reader;

        private Thread _subscribeThread;

        private bool _disposed;

        #endregion


        #region Public Properties

        public int MilisecToRead { get; set; } = 1000;

        public List<Log> Logs { get; set; }
        public string Path { get; set; }


        #endregion


        #region Events

        public event EventHandler<EventArgs> LogChanged;

        #endregion


        #region Constructors

        public LogReader(string path)
        {
            Path = path;
            _reader = new StreamReader(path);
            Logs = new List<Log>();
        }

        #endregion


        #region Public Methods

        public void ReadLogs()
        {
            var file = _reader.ReadToEnd();
            foreach (var log in file.Split("\n"))
            {
                var result = FromFormat(log, "");
                if (result != null)
                    Logs.Add(result);
            }

            //LogChanged?.Invoke(this, new EventArgs());

            Application.Current.Dispatcher.BeginInvoke(new EventHandler<EventArgs>(LogChanged), this, new EventArgs());

        }

        public void Subscribe()
        {
            ReadLogs();
            _subscribeThread = new Thread(SubscribeToLog);
            _subscribeThread.Start();
        }

        #endregion


        #region Private Methods

        private Log FromFormat(string logEntry, string format)
        {
            if (!string.IsNullOrWhiteSpace(logEntry))
            {
                string timestamp = logEntry.Substring(1, 19);


                var rest = logEntry.Remove(0, 21);
                var splitted = rest.Split(")", 2);

                var level = new LogLevel()
                {
                    LevelName = splitted[0].Remove(0, 1)
                };
                var logContent = splitted[1].Remove(0, 2);

                DateTime.TryParse(timestamp, out var timeStampDateTime);

                return new Log()
                {
                    Content = logContent,
                    LogLevel = level,
                    Timestamp = timeStampDateTime
                };
            }
            return null;
        }

        /*private void SubscribeToLog()
        {  
            while (!_disposed)
            {
                while (!_reader.EndOfStream)
                {
                    string line = _reader.ReadLine();
                    if(_reader.Peek() == -1)
                    {
                        var log = FromFormat(line, "");
                        Logs.Add(log);
                        LogChanged?.Invoke(this, new EventArgs());

                        Thread.Sleep(MilisecToRead);
                    }
                }
            }
        }*/
        private void SubscribeToLog()
        {
            while (!_disposed)
            {
                using (var reader = new StreamReader(Path))
                {
                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine();
                        if (reader.Peek() == -1)
                        {
                            var log = FromFormat(line, "");
                            Logs.Add(log);
                            LogChanged?.Invoke(this, new EventArgs());

                            Thread.Sleep(MilisecToRead);
                        }
                    }
                }
            }
        }

        #endregion

        public void Dispose()
        {
            _disposed = true;
            _subscribeThread.Abort();
            _reader.Dispose();
        }

    }
}
