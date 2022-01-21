namespace HW22 {
    class Artist : Playable {
	public string name;
	public Song[] songs;
	public void Play(PlayMode mode) {
	    foreach(Song s in songs) {
		s.Play(mode);
	    }
	}
	public Artist(string name) {
	    this.name = name;
	}
    }
    class Album : Playable {
	string name;
	public Song[] songs;
	public Album(string n, Song[] s) {
	    name = n;
	    songs = s;
	}
	public void Play(PlayMode mode) {
	    foreach(Song s in songs) {
		s.Play(mode);
	    }
	}
    }
    class Song : Playable {
	public string name;
	public Artist artist;
	public void Play(PlayMode mode) {
	    System.Console.WriteLine($"Now playing {artist} - {name}");
	    if ((int) mode == 1) this.Play(PlayMode.NORMAL);
	}
	public Song(Artist a, string n) {
	    artist = a;
	    name = n;
	}
    }
    interface Playable {
	void Play(PlayMode mode);
    }
    internal enum PlayMode {
	NORMAL = 0,
	REPEAT = 1,
    }
    class HW22 {
	public static void Main(string[] args) {
	}
    }
}
