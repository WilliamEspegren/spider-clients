/**
 * Represents viewport dimensions.
 */
export interface Viewport {
  width: number;
  height: number;
}

/**
 * Represents HTTP headers as a dictionary object.
 */
export interface Headers {
  [key: string]: string;
}

/**
 * Represents a budget for various resources.
 */
export interface Budget {
  [key: string]: number;
}

/**
 * The chunking algorithm to use.
 */
export type ChunkingAlgType =
  | "ByWords"
  | "ByLines"
  | "ByCharacterLength"
  | "BySentence";

/**
 * The chunking algorithm with the value to chunk by.
 */
export interface ChunkingAlg {
  type: ChunkingAlgType;
  value: number;
}

/**
 * Represents a timeout configuration.
 * @typedef {Object} Timeout
 * @property {number} secs - The number of seconds.
 * @property {number} nanos - The number of nanoseconds.
 */
interface Timeout {
  secs: number;
  nanos: number;
}

/**
 * Represents the idle network configuration.
 * @typedef {Object} IdleNetwork
 * @property {Timeout} timeout - The timeout configuration.
 */
interface IdleNetwork {
  timeout: Timeout;
}

/**
 * Represents the selector configuration.
 * @typedef {Object} Selector
 * @property {Timeout} timeout - The timeout configuration.
 * @property {string} selector - The CSS selector to wait for.
 */
interface Selector {
  timeout: Timeout;
  selector: string;
}

/**
 * Represents the delay configuration.
 * @typedef {Object} Delay
 * @property {Timeout} timeout - The timeout configuration.
 */
interface Delay {
  timeout: Timeout;
}

/**
 * Represents the wait_for configuration.
 * @typedef {Object} WaitFor
 * @property {IdleNetwork} [idle_network] - Configuration to wait for network to be idle.
 * @property {Selector} [selector] - Configuration to wait for a CSS selector.
 * @property {Delay} [delay] - Configuration to wait for a delay.
 * @property {boolean} [page_navigations] - Whether to wait for page navigations.
 */
interface WaitFor {
  idle_network?: IdleNetwork;
  selector?: Selector;
  delay?: Delay;
  page_navigations?: boolean;
}

/**
 * Represents the query API endpoint request to get documents from the global spider collection.
 */
export interface QueryRequest {
  /**
   * The exact URL to get.
   */
  url?: string;
  /**
   * The domain to get a document from.
   */
  domain?: string;
  /**
   * The path of the webpage to get the document. This is used with the domain key.
   */
  pathname?: string;
}

/**
 * Represents the options available for making a spider request.
 */
export interface SpiderParams {
  /**
   * The URL to be crawled.
   */
  url: string;

  /**
   * The type of request to be made.
   */
  request?: "http" | "chrome" | "smart";

  /**
   * The maximum number of pages the crawler should visit.
   */
  limit?: number;

  /**
   * The format in which the result should be returned.
   */
  return_format?:
    | "markdown"
    | "commonmark"
    | "raw"
    | "text"
    | "html2text"
    | "bytes";

  /**
   * Specifies whether to only visit the top-level domain.
   */
  tld?: boolean;

  /**
   * The depth of the crawl.
   */
  depth?: number;

  /**
   * Specifies whether the request should be cached.
   */
  cache?: boolean;

  /**
   * The budget for various resources.
   */
  budget?: Budget;

  /**
   * The blacklist routes to ignore. This can be a Regex string pattern.
   */
  blacklist?: string[];

  /**
   * The whitelist routes to only crawl. This can be a Regex string pattern and used with black_listing.
   */
  whitelist?: string[];

  /**
   * The locale to be used during the crawl.
   */
  locale?: string;

  /**
   * The cookies to be set for the request, formatted as a single string.
   */
  cookies?: string;

  /**
   * Specifies whether to use stealth techniques to avoid detection.
   */
  stealth?: boolean;

  /**
   * The headers to be used for the request.
   */
  headers?: Headers;

  /**
   * Specifies whether anti-bot measures should be used.
   */
  anti_bot?: boolean;

  /**
   * Specifies whether to include metadata in the response.
   */
  metadata?: boolean;

  /**
   * The dimensions of the viewport.
   */
  viewport?: Viewport;

  /**
   * The encoding to be used for the request.
   */
  encoding?: "UTF-8" | "SHIFT_JIS" | string;

  /**
   * Specifies whether to include subdomains in the crawl.
   */
  subdomains?: boolean;

  /**
   * The user agent string to be used for the request.
   */
  user_agent?: string;

  /**
   * Specifies whether the response data should be stored.
   */
  store_data?: boolean;

  /**
   * Configuration settings for GPT (general purpose texture mappings).
   */
  gpt_config?: string[];

  /**
   * Specifies whether to use fingerprinting protection.
   */
  fingerprint?: boolean;

  /**
   * Specifies whether to perform the request without using storage.
   */
  storageless?: boolean;

  /**
   * Specifies whether readability optimizations should be applied.
   */
  readability?: boolean;

  /**
   * Specifies whether to use a proxy for the request.
   */
  proxy_enabled?: boolean;

  /**
   * Specifies whether to respect the site's robots.txt file.
   */
  respect_robots?: boolean;

  /**
   * CSS selector to be used to filter the content.
   */
  query_selector?: string;

  /**
   * Specifies whether to load all resources of the crawl target.
   */
  full_resources?: boolean;

  /**
   * Specifies whether to use the sitemap links.
   */
  sitemap?: boolean;

  /**
   * Get page insights to determine information like request duration, accessibility, and other web vitals. Requires the `metadata` parameter to be set to `true`.
   */
  page_insights?: boolean;

  /**
   * Returns the OpenAI embeddings for the title and description. Other values, such as keywords, may also be included. Requires the `metadata` parameter to be set to `true`.
   */
  return_embeddings?: boolean;

  /**
   * The timeout for the request, in milliseconds.
   */
  request_timeout?: number;

  /**
   * Specifies whether to run the request in the background.
   */
  run_in_background?: boolean;

  /**
   * Specifies whether to skip configuration checks.
   */
  skip_config_checks?: boolean;

  /**
   * The chunking algorithm to use.
   */
  chunking_alg?: ChunkingAlg;

  /**
   * The wait for events on the page. You need to make your `request` `chrome` or `smart`.
   */
  wait_for?: WaitFor;

  /**
   * Disable request interception when running 'request' as 'chrome' or 'smart'. This can help when the page uses 3rd party or external scripts to load content.
   */
  disable_intercept?: boolean;
}

// Core actions response type.
export type SpiderCoreResponse = {
  // The content of the request like html or transformation markdown etc.
  content?: string;
  // A detailed message of a response.
  message?: string;
  // If an error occured.
  error?: string;
  // The HTTP status code.
  status?: number;
  // The website url.
  url?: string;
};

export type ChunkCallbackFunction = (data: SpiderCoreResponse) => void;

// records that you can query
export enum Collection {
  Websites = "websites",
  Pages = "pages",
  PagesMetadata = "pages_metadata",
  // Leads
  Contacts = "contacts",
  CrawlState = "crawl_state",
  CrawlLogs = "crawl_logs",
  Profiles = "profiles",
  Credits = "credits",
  Webhooks = "webhooks",
  APIKeys = "api_keys",
}

// The API version for Spider
export enum ApiVersion {
  V1 = "v1",
}

// The API routes paths.
export enum APIRoutes {
  // Crawl a website to collect the contents. Can be one page or many.
  Crawl = "crawl",
  // Crawl a website to collect the links. Can be one page or many.
  Links = "links",
  // Crawl a website to collect screenshots. Can be one page or many.
  Screenshot = "screenshot",
  // Search for something and optionally crawl the pages or get the results of the search.
  Search = "search",
  // Transform HTML to markdown or text.
  Transform = "transform",
  // Pipeline extract leads for a website - emails, phones, etc.
  PiplineExtractLeads = "pipeline/extract-contacts",
  // Pipeline label a website by category using AI and metadata.
  PiplineLabel = "pipeline/label",
  // Dynamic collection routes.
  Data = "data",
  // The last crawl state of a website.
  DataCrawlState = "data/crawl_state",
  // Sign a file from storage based on the exact url path of the storage or domain - pathname.
  DataSignUrl = "data/sign-url",
  // Download a file from storage based on the exact url path of the storage or domain - pathname.
  DataDownload = "data/download",
  // Perform a query on the global database to grab content without crawling if available.
  DataQuery = "data/query",
  // Get the credits remaining for an account.
  DataCredits = "data/credits",
}

// The base API target info for Spider Cloud.
export const APISchema = {
  url: "https://api.spider.cloud",
  versions: {
    current: ApiVersion.V1,
    v1: {
      routes: APIRoutes,
      end_date: "",
    },
    latest: {
      routes: APIRoutes,
      end_date: "",
    },
  },
};

// Adjust the Spider Cloud endpoint.
export const setBaseUrl = (url: string) => {
  if (url) {
    APISchema["url"] = url;
  }
};
