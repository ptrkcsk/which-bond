# `which-bond`

> Bond, which Bond?

`which-bond` is a Node.js command line tool for choosing a random James Bond film to watch.

```
$ which-bond

  On Her Majesty's Secret Service (1969)

  Starring George Lazenby as James Bond

  James Bond tracks archnemesis Ernst Blofeld to a mountaintop retreat
  where he's training an army of beautiful but lethal women. Along the
  way, Bond falls for Italian contessa Tracy Draco -- and marries her in
  order to get closer to Blofeld. Meanwhile, he locates Blofeld in the
  Alps and embarks on a classic ski chase.

```

---

## How to use `which-bond`

There are two ways to use `which-bond`:

### 1. Install `which-bond` locally:

1. [Install Node.js and npm](https://docs.npmjs.com/getting-started/installing-node)
1. Install `which-bond`:

```
$ npm install --global which-bond
$ which-bond
```

### 2. Run `which-bond ` without installing (requires Node.js v5.2.0+):

```
$ npx which-bond
```

---

## Usage

Run `which-bond --help` to see supported options:

```
$ which-bond --help
 
 Usage: which-bond [options]

 Options:

   -V, --version                 output the version number
   -b, --include-bonds [actors]  Include one or more Bond actors, by last name. Examples: `-b lazenby`, `-b connery,moore`. (default: all)
   -B, --exclude-bonds [actors]  Exclude one or more Bond actors, by last name. Examples: `-B niven`, `-B brosnan,niven`. (default: none)
   -h, --help                    output usage information
```

---

## Acknowledgments

<a href='https://www.themoviedb.org/'><img src='./assets/images/powered-by-tmdb.png' height='75'></a>

`which-bond` uses the [TMDb API](https://www.themoviedb.org/documentation/api) but is not endorsed or certified by TMDb.
