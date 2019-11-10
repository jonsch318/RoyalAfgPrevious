using System;
using System.Collections.Generic;
using System.Text;

namespace logReader
{
    public struct LogLevel
    {
        public string LevelName { get; set; }
    }

    public class Log
    {

        #region Public Properties

        public string Content { get; set; }

        public LogLevel LogLevel { get; set; }

        public DateTime Timestamp { get; set; }

        #endregion

    }
}
