# `which-bond`

> Bond, which Bond?

`which-bond` is a Node.js command line tool for choosing a random James Bond film to watch.

```
$ which-bond

  On Her Majesty's Secret Service

  Starring George Lazenby as James Bond

  James Bond tracks archnemesis Ernst Blofeld to a mountaintop retreat
  where he's training an army of beautiful but lethal women. Along the
  way, Bond falls for Italian contessa Tracy Draco -- and marries her in
  order to get closer to Blofeld. Meanwhile, he locates Blofeld in the
  Alps and embarks on a classic ski chase.

```

---

## How to use `which-bond` if you’re familiar with Node.js and npm

### [Install Node.js and npm](https://docs.npmjs.com/getting-started/installing-node)

### [Get a TMDb API key](https://developers.themoviedb.org/3/getting-started)

### Add your TMDb API key to `which-bond`

- Make a copy of `.env.example` and call it `.env`
- Add your TMDb API key to `.env`. (Leave `.env.example` alone.) `.env` should now look like this:

```
TMDB_API_KEY=XXXXXXX 👈 Put your API key here
```

*[(Learn about dotenv)](https://github.com/motdotla/dotenv)*

- Install `which-bond`:

```
$ npm install --global which-bond
```

*(`which-bond` is a command line tool, hence the [`--global` install](https://docs.npmjs.com/getting-started/installing-npm-packages-globally))*

- Run `which-bond`:

```
$ which-bond
```

ℹ️ NOTE: The first time you run `which-bond`, it will download the Bond film data from TMDb and cache it on your computer. It may take around 30 seconds to complete the download, but after that `which-bond` will be very fast. Don't worry, it's not downloading a ton of data, it's just spacing out requests to TMDb so as not to go over their [request rate limit](https://developers.themoviedb.org/3/getting-started/request-rate-limiting). You can look at the database yourself when it's finished. It's just a JSON file called `.db.json`.

### Options

`which-bond` supports the following command line options:

|Option|Parameter|Examples|Description|
|---|---|---|---|
|`-b` or `--include-bonds`|The last name of a single Bond actor or a comma-separated list of last names|- `which-bond -b lazenby`<br>- `which-bond -b connery,moore`|Only choose from films in which Bond was played by one of the specified actors|
|`-B` or `--exclude-bonds`|The last name of a single Bond actor or a comma-separated list of last names|- `which-bond -B brosnan`|Exclude films in which Bond was played by one of the specified actors|

## How to use `which-bond` if you’re *not* familiar with Node.js and/or npm

*(Coming soon)*

---

## Acknowledgments

<a href='https://www.themoviedb.org/'><img src='./assets/images/powered-by-tmdb.png' height='75'></a>

`which-bond` uses the [TMDb API](https://www.themoviedb.org/documentation/api) but is not endorsed or certified by TMDb.
