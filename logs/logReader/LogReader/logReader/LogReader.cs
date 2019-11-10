using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace logReader
{
    public class LogReader
    {

        public List<Log> ReadLogs(string path)
        {
            List<Log> logs = new List<Log>();
            using (var reader = new StreamReader(path))
            {
                string content = reader.ReadToEnd();

                string timestamp = content.Substring(1,24);

                content.Remove(0,26);

                string level = content.Split(")")[0];

                content = content.Split(")")[1];

                content.Remove(0,2);
                
            }

        }  

    }
}
