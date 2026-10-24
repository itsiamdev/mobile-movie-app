const OMDB_API_URL = "https://www.omdbapi.com/";

export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbMovieDetails extends OmdbMovie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface OmdbSearchResult {
  movies: OmdbMovie[];
  totalResults: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isOmdbMovie(
  value: unknown,
): value is Record<string, unknown> & OmdbMovie {
  return (
    isRecord(value) &&
    typeof value.Title === "string" &&
    typeof value.Year === "string" &&
    typeof value.imdbID === "string" &&
    typeof value.Type === "string" &&
    typeof value.Poster === "string"
  );
}

function isOmdbMovieDetails(value: unknown): value is OmdbMovieDetails {
  return (
    isOmdbMovie(value) &&
    typeof value.Rated === "string" &&
    typeof value.Released === "string" &&
    typeof value.Runtime === "string" &&
    typeof value.Genre === "string" &&
    typeof value.Director === "string" &&
    typeof value.Writer === "string" &&
    typeof value.Actors === "string" &&
    typeof value.Plot === "string" &&
    typeof value.Language === "string" &&
    typeof value.Country === "string" &&
    typeof value.Awards === "string" &&
    typeof value.imdbRating === "string" &&
    typeof value.imdbVotes === "string"
  );
}

async function requestOmdb(params: Record<string, string>): Promise<unknown> {
  const apiKey = process.env.EXPO_PUBLIC_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_OMDB_API_KEY. Add it to your local .env.local file.",
    );
  }

  const query = new URLSearchParams({
    apikey: apiKey,
    ...params,
  }).toString();
  const response = await fetch(`${OMDB_API_URL}?${query}`);

  if (!response.ok) {
    throw new Error(`OMDb request failed with status ${response.status}.`);
  }

  const data: unknown = await response.json();
  if (!isRecord(data)) {
    throw new Error("Invalid response from OMDb.");
  }
  if (data.Response === "False" && typeof data.Error === "string") {
    throw new Error(data.Error);
  }
  if (data.Response !== "True") {
    throw new Error("Invalid response from OMDb.");
  }

  return data;
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<OmdbSearchResult> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    throw new Error("Search term cannot be empty.");
  }
  if (!Number.isInteger(page) || page < 1 || page > 100) {
    throw new Error("Page must be an integer between 1 and 100.");
  }

  const data = await requestOmdb({ s: searchTerm, type: "movie", page: `${page}` });
  if (
    !isRecord(data) ||
    !Array.isArray(data.Search) ||
    !data.Search.every(isOmdbMovie) ||
    typeof data.totalResults !== "string"
  ) {
    throw new Error("Invalid movie search response from OMDb.");
  }

  const totalResults = Number(data.totalResults);
  if (!Number.isFinite(totalResults)) {
    throw new Error("Invalid total results in OMDb response.");
  }

  return { movies: data.Search, totalResults };
}

export async function getMovieDetails(
  imdbID: string,
): Promise<OmdbMovieDetails> {
  const id = imdbID.trim();
  if (!id) {
    throw new Error("IMDb ID cannot be empty.");
  }

  const data = await requestOmdb({ i: id, plot: "full" });
  if (!isOmdbMovieDetails(data)) {
    throw new Error("Invalid movie details response from OMDb.");
  }

  return data;
}