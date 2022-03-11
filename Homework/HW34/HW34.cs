using System.IO;
using System.Text;
namespace HW34 {
    class HW34 {
	public static void Main(string[] args) {
	    var dataDir = @"/home/mwait/devel/my_PCS_work/Homework/HW34/data";//absolute path just to be safe
	    var dir = new DirectoryInfo(dataDir);

	    var dataFiles = dir.GetFiles();
	
	    dataFiles[0].CopyTo("us500.csv");
	    var conglomerateFile = new FileInfo($"{dataDir}/us500.csv");

	    StreamReader sr;
	    StringBuilder sb;
	    StreamWriter sw = new StreamWriter(conglomerateFile.OpenWrite());
	
	    for (int i = 1; i < dataFiles.Length; i++) {
		sr = new StreamReader(dataFiles[i].OpenRead());
		sb = new StringBuilder();
	    
		_ = sr.ReadLine();
		string s = sr.ReadLine();
		while(s != null) {
		    sb.Append(s);
		    s = sr.ReadLine();
		}
		sw.Write(sb);
		sw.Flush();
	    }
	
	}
    }
}
