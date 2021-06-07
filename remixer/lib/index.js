$(document).ready(function() {

window.songDatabase = {
  songs : []
};

var scale = {
  notes : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
};

class Song {
    constructor(artist, title, key, bpm) {
        this.artist = artist;
        this.title = title;
        this.key = key;
        this.bpm = bpm;
        this.semitone = this.keyToSemitone(key);
        this.relativeKey = this.getRelativeKey(key);
    }

    keyToSemitone(theKey){
      var note = theKey.split(" ")[0];
      return (scale.notes.indexOf(note))
    }

    getRelativeKey(theKey){
      var note = theKey.split(" ")[0];
      var mode = theKey.split(" ")[1];
      if (mode == "major"){
        var newIndex = scale.notes.indexOf(note) - 3;
        if (newIndex < 0)
          newIndex += 12;
        return scale.notes[newIndex] + " minor"
      }
      else if (mode == "minor"){
        var newIndex = scale.notes.indexOf(note) + 3;
        if (newIndex > 11)
          newIndex -= 12;
        return scale.notes[newIndex] + " major";
      }
    }
};

// on startup
createDatabase();
fillTable();

// functions
$("#order").change(function(){
  fillTable();
});

$("#key").change(function(){
  fillTable();
});

$("#mode").change(function(){
  fillTable();
});

$("#relatives").change(function(){
  fillTable();
});

function fillTable(){
  $('#mainTable').empty();
  var orderOption = $("#order").val();
  if (orderOption == "Artist"){
    window.songDatabase.songs.sort((a,b) => (a.artist.localeCompare(b.artist))); 
  }
  else if (orderOption == "Title"){
    window.songDatabase.songs.sort((a,b) => (a.title.localeCompare(b.title))); 
  }
  else if (orderOption == "Key"){
    window.songDatabase.songs.sort((a,b) => (parseFloat(a.semitone) - parseFloat(b.semitone))); 
  }
  else if (orderOption == "BPM"){
    window.songDatabase.songs.sort((a,b) => (parseFloat(a.bpm) - parseFloat(b.bpm))); 
  }

  for (song in window.songDatabase.songs){
    var thisSong = window.songDatabase.songs[song];
    var newElement = '<tr>'
    +'<td>' + thisSong.artist + '</td>'
    +'<td>' + thisSong.title + '</td>'
    +'<td>' + thisSong.key + '</td>'
    +'<td>' + thisSong.bpm + '</td>'
    +'</tr>';
    if ($(key).val() && typeof $(key).val() != "undefined"){
      selectedKey = $(key).val() + " " + $(mode).val();
      if (thisSong.key == selectedKey){
        $(newElement).appendTo('#mainTable').css("background-color", "#1f7a1f");
      }
      else if (thisSong.relativeKey == selectedKey && $("#relatives").is(":checked")){
        $(newElement).appendTo('#mainTable').css("background-color", "#e67300");
      }
      else {
        $(newElement).appendTo('#mainTable');
      }
    }
    else {
      $(newElement).appendTo('#mainTable');
    }
  }
}

// data
function createDatabase() {
  window.songDatabase.songs.push(new Song("100 gecs", "800db cloud", "F minor", 130));
  window.songDatabase.songs.push(new Song("100 gecs", "hand crushed by a mallet", "C# minor", 85));
  window.songDatabase.songs.push(new Song("100 gecs", "money machine", "F# major", 99));
  window.songDatabase.songs.push(new Song("100 gecs", "ringtone", "G# major", 108));
  window.songDatabase.songs.push(new Song("a-ha", "Take on Me", "F# minor", 84));
  window.songDatabase.songs.push(new Song("Aaliyah", "Are You That Somebody", "A minor", 138));
  window.songDatabase.songs.push(new Song("Alabama Shakes", "Don't Wanna Fight", "A# minor", 100));
  window.songDatabase.songs.push(new Song("alt-J", "Breezeblocks", "F major", 150));
  window.songDatabase.songs.push(new Song("Ariana Grande", "One Last Time", "G# major", 125));
  window.songDatabase.songs.push(new Song("Ariana Grande", "Side to Side", "F# minor", 159));
  window.songDatabase.songs.push(new Song("Bastille", "Pompeii", "A major", 127));
  window.songDatabase.songs.push(new Song("Billie Eilish", "bad guy", "G major", 135));
  window.songDatabase.songs.push(new Song("Billie Eilish", "idontwannabeyouanymore", "G major", 135));
  window.songDatabase.songs.push(new Song("Billie Eilish", "xanny", "A major", 112));
  window.songDatabase.songs.push(new Song("Blur", "Song 2", "G# major", 130));
  window.songDatabase.songs.push(new Song("Britney Spears", "Gimme More", "D major", 113));
  window.songDatabase.songs.push(new Song("Buffalo Springfield", "For What It's Worth", "D major", 99));
  window.songDatabase.songs.push(new Song("Calvin Harris", "Sweet Nothing", "G# minor", 128));
  window.songDatabase.songs.push(new Song("Celldweller", "The Last Firstborn", "A# minor", 134));
  window.songDatabase.songs.push(new Song("Charli XCX", "Boys", "D major", 140));
  window.songDatabase.songs.push(new Song("Charli XCX", "Unlock It", "A major", 135));
  window.songDatabase.songs.push(new Song("Clean Bandit", "Rather Be", "B major", 121));
  window.songDatabase.songs.push(new Song("Coldplay", "Clocks", "F minor", 131));
  window.songDatabase.songs.push(new Song("Coldplay", "Fix You", "D# major", 138));
  window.songDatabase.songs.push(new Song("Coldplay", "Shiver", "E major", 117));
  window.songDatabase.songs.push(new Song("Coldplay", "Yellow", "B major", 86));
  window.songDatabase.songs.push(new Song("Carly Rae Jepsen", "Call Me Maybe", "G major", 120));
  window.songDatabase.songs.push(new Song("Cyndi Lauper", "Time After Time", "C major", 130));
  window.songDatabase.songs.push(new Song("Dada Life", "So Young So High", "A major", 129));
  window.songDatabase.songs.push(new Song("Daft Punk", "Get Lucky", "F# minor", 116));
  window.songDatabase.songs.push(new Song("David Guetta ft. Charli XCX", "Dirty Sexy Money", "C# major", 80));
  window.songDatabase.songs.push(new Song("Dear and the Headlights", "Sweet Talk", "B major", 161));
  window.songDatabase.songs.push(new Song("Dragonforce", "Through the Fire and Flames", "C minor", 100));
  window.songDatabase.songs.push(new Song("Earth, Wind & Fire", "Boogie Wonderland", "D minor", 132));
  window.songDatabase.songs.push(new Song("Eminem", "Stan", "F# minor", 80));
  window.songDatabase.songs.push(new Song("Foster the People", "Pumped Up Kicks", "F minor", 128));
  window.songDatabase.songs.push(new Song("Gorillaz", "Feel Good Inc.", "F# major", 139));
  window.songDatabase.songs.push(new Song("Justin Bieber", "What Do You Mean", "F minor", 125));
  window.songDatabase.songs.push(new Song("Kilo Kish", "Hello, Lakisha", "G# major", 168));
  window.songDatabase.songs.push(new Song("Kyle Dion", "Glass House", "F# minor", 73));
  window.songDatabase.songs.push(new Song("Lauv", "I Like Me Better", "A major", 92));
  window.songDatabase.songs.push(new Song("Lil Nas X", "Old Town Road", "C# major", 137));
  window.songDatabase.songs.push(new Song("Linkin Park", "In The End", "D# minor", 105));
  window.songDatabase.songs.push(new Song("Louis the Child", "Better Not", "A major", 114));
  window.songDatabase.songs.push(new Song("Maggie Rogers", "Fallingwater", "D major", 87));
  window.songDatabase.songs.push(new Song("MAGIC!", "Rude", "C# major", 144));
  window.songDatabase.songs.push(new Song("Major Lazer", "Cold Water", "F# minor", 93));
  window.songDatabase.songs.push(new Song("Mark Ronson", "Uptown Funk", "C major", 115));
  window.songDatabase.songs.push(new Song("Matchbox Twenty", "Unwell", "A major", 81));
  window.songDatabase.songs.push(new Song("MGMT", "Kids", "A major", 123));
  window.songDatabase.songs.push(new Song("Michael Jackson", "Black or White", "A major", 115));
  window.songDatabase.songs.push(new Song("Muse", "Starlight", "E major", 122));
  window.songDatabase.songs.push(new Song("Owl City", "Fireflies", "D# major", 90));
  window.songDatabase.songs.push(new Song("Passion Pit", "Sleepyhead", "G# major", 106));
  window.songDatabase.songs.push(new Song("Periphery", "Scarlet", "C major", 90));
  window.songDatabase.songs.push(new Song("Phantogram", "Fall in Love", "D minor", 94));
  window.songDatabase.songs.push(new Song("Portugal. The Man", "Feel it Still", "C# minor", 79));
  window.songDatabase.songs.push(new Song("Queen", "We Will Rock You", "D major", 81));
  window.songDatabase.songs.push(new Song("Rage Against the Machine", "Guerilla Radio", "B major", 104));
  window.songDatabase.songs.push(new Song("RHCP", "By the Way", "C major", 122));
  window.songDatabase.songs.push(new Song("RHCP", "Californication", "A minor", 96));
  window.songDatabase.songs.push(new Song("RHCP", "Naked in the Rain", "F minor", 116));
  window.songDatabase.songs.push(new Song("RHCP", "Scar Tissue", "D minor", 90));
  window.songDatabase.songs.push(new Song("RHCP", "Suck My Kiss", "C major", 102));
  window.songDatabase.songs.push(new Song("Rihanna", "Work", "B major", 92));
  window.songDatabase.songs.push(new Song("Rise Against", "Give it All", "D major", 103));
  window.songDatabase.songs.push(new Song("Rita Ora", "Girls", "G# major", 94));
  window.songDatabase.songs.push(new Song("Rush", "Closer to the Heart", "D major", 145));
  window.songDatabase.songs.push(new Song("Santana", "Smooth", "A major", 116));
  window.songDatabase.songs.push(new Song("Sia", "Chandelier", "C# major", 117));
  window.songDatabase.songs.push(new Song("Simon & Garfunkel", "I Am a Rock", "C major", 114));
  window.songDatabase.songs.push(new Song("Simon & Garfunkel", "The Sound of Silence", "F# minor", 86));
  window.songDatabase.songs.push(new Song("Smash Mouth", "All Star", "B major", 104));
  window.songDatabase.songs.push(new Song("Smashing Pumpkins", "1979", "D# major", 127));
  window.songDatabase.songs.push(new Song("Snakehips", "All My Friends", "C major", 95));
  window.songDatabase.songs.push(new Song("Snoop Dogg", "Drop it Like it's Hot", "C# major", 92));
  window.songDatabase.songs.push(new Song("Spice Girls", "Wannabe", "B major", 110));
  window.songDatabase.songs.push(new Song("Stevie Wonder", "Superstition", "G# major", 100));
  window.songDatabase.songs.push(new Song("Sum 41", "Fat Lip", "A major", 98));
  window.songDatabase.songs.push(new Song("System of a Down", "Chop Suey", "G minor", 127));
  window.songDatabase.songs.push(new Song("The Chainsmokers", "Closer", "G# major", 95));
  window.songDatabase.songs.push(new Song("The Fratellis", "Flathead", "C major", 105));
  window.songDatabase.songs.push(new Song("The Fray", "How to Save a Life", "A# major", 122));
  window.songDatabase.songs.push(new Song("The Fray", "You Found Me", "G# minor", 152));
  window.songDatabase.songs.push(new Song("The Weeknd", "Starboy", "G major", 93));
  window.songDatabase.songs.push(new Song("The Weeknd", "Can't Feel My Face", "A minor", 108));
  window.songDatabase.songs.push(new Song("The Who", "My Generation", "F major", 97));
  window.songDatabase.songs.push(new Song("Third Eye Blind", "Semi-Charmed Life", "G major", 102));
  window.songDatabase.songs.push(new Song("Tides of Man", "A Faint Illusion", "C major", 160));
  window.songDatabase.songs.push(new Song("Toto", "Rosanna", "G minor", 78));
  window.songDatabase.songs.push(new Song("Travis Scott", "Goosebumps", "E minor", 130));
  window.songDatabase.songs.push(new Song("Vitas", "7 The Element", "F# major", 128));
  window.songDatabase.songs.push(new Song("Yes", "Owner of a Lonely Heart", "C major", 116));
  window.songDatabase.songs.push(new Song("Yes", "Roundabout", "E minor", 144));
  window.songDatabase.songs.push(new Song("Young the Giant", "Cough Syrup", "D major", 129));
  window.songDatabase.songs.push(new Song("Zedd", "Clarity", "G# major", 128));

}


});
