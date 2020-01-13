using System;
using System.Collections.Generic;
using System.Text;
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
    /// Interaction logic for LogControll.xaml
    /// </summary>
    public partial class LogControll : UserControl
    {

        #region Private Fields

        private Log _log;

        #endregion

        #region Public Properties

        public string LogLevel { get; set; }

        public string LogContent { get; set; }

        public string LogTimestamp { get; set; }

        public Log Log { 
            get => _log; 
            set => Config(value);
            }

        #endregion

        public LogControll()
        {
            InitializeComponent();
            DataContext = this;
        }

        private void Config(Log log)
        {
            _log = log;
            LogLevel = log.LogLevel.LevelName;
            LogContent = log.Content;
            LogTimestamp = log.Timestamp.ToString();
        }

    }
}
