using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace logReader
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        #region Private Fields

        private List<Log> _logs => _logReader.Logs;

        private LogReader _logReader;

        #endregion


        #region Constructors

        public MainWindow()
        {
            InitializeComponent();

            _logReader = new LogReader("G:\\git\\RoyalAfg\\logs\\entire.log");

            _logReader.LogChanged += updateUi;


            _logReader.Subscribe();
        }


        #endregion


        private void updateUi(object sender, EventArgs e)
        {
            LogPanel.Children.Clear();
                foreach (var log in _logs)
                {
                    var logControll = new LogControll()
                    {
                        Log = log
                    };

                    LogPanel.Children.Add(logControll);
                }
        }



        private void queryTextBox_KeyUp(object sender, KeyEventArgs e)
        {
            if (string.IsNullOrEmpty(queryTextBox.Text))
            {
                return;
            }

            var query = queryTextBox.Text;

            LogReader logReader = new LogReader("G:\\git\\RoyalAfg\\logs\\entire.log");

            var results = _logs.FindAll(x => x.LogLevel.LevelName.StartsWith(query));

        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            _logReader.Dispose();
        }
    }
}
