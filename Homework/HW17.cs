 #nullable enable

using System;

namespace HW17 {

  class Artist {

    string name;
public string Name {
get {return name;}
}

    public Artist(string s) {

      name = s;

    }

  }

  class Song {

    string name;

    string lyrics;//I resent this

    Artist artist;//should really be a collection instead since collabs are a very real thing (and many of the best songs are collabs)

    public Song(string n, string l, Artist a) {

      name = n;

      lyrics = l;

      artist = a;

    }

    public void Display() {

      Console.WriteLine($"{artist.Name} - {name}");

    }

    public void Play() {

      if (lyrics != null) {

        Console.WriteLine(lyrics);

      }

    }

  }

  public class HW17 {

    public static void Main(string[] args) {

      Artist teminite = new Artist("Teminite");

      Song ascent = new Song(teminite, null, "Ascent"); //an amazing song

      ascent.Display();

      ascent.Play();

      Artist somanylynx = new Artist("somanylynx");

      Song loveLetters = new Song(somanylynx, null, "Love Letters"); //another amazing song

      loveLetters.Display();

      loveLetters.Play();

    }

  }

}
