/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown
      }
    }
  }
  '/lessons': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.lessons.id']
          created_at?: parameters['rowFilter.lessons.created_at']
          title?: parameters['rowFilter.lessons.title']
          description?: parameters['rowFilter.lessons.description']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['lessons'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** lessons */
          lessons?: definitions['lessons']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.lessons.id']
          created_at?: parameters['rowFilter.lessons.created_at']
          title?: parameters['rowFilter.lessons.title']
          description?: parameters['rowFilter.lessons.description']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.lessons.id']
          created_at?: parameters['rowFilter.lessons.created_at']
          title?: parameters['rowFilter.lessons.title']
          description?: parameters['rowFilter.lessons.description']
        }
        body: {
          /** lessons */
          lessons?: definitions['lessons']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  '/premium_content': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.premium_content.id']
          created_at?: parameters['rowFilter.premium_content.created_at']
          video_url?: parameters['rowFilter.premium_content.video_url']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['premium_content'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** premium_content */
          premium_content?: definitions['premium_content']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.premium_content.id']
          created_at?: parameters['rowFilter.premium_content.created_at']
          video_url?: parameters['rowFilter.premium_content.video_url']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.premium_content.id']
          created_at?: parameters['rowFilter.premium_content.created_at']
          video_url?: parameters['rowFilter.premium_content.video_url']
        }
        body: {
          /** premium_content */
          premium_content?: definitions['premium_content']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  '/profile': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.profile.id']
          created_at?: parameters['rowFilter.profile.created_at']
          is_subscribed?: parameters['rowFilter.profile.is_subscribed']
          interval?: parameters['rowFilter.profile.interval']
          stripe_customer?: parameters['rowFilter.profile.stripe_customer']
          email?: parameters['rowFilter.profile.email']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['profile'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** profile */
          profile?: definitions['profile']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.profile.id']
          created_at?: parameters['rowFilter.profile.created_at']
          is_subscribed?: parameters['rowFilter.profile.is_subscribed']
          interval?: parameters['rowFilter.profile.interval']
          stripe_customer?: parameters['rowFilter.profile.stripe_customer']
          email?: parameters['rowFilter.profile.email']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.profile.id']
          created_at?: parameters['rowFilter.profile.created_at']
          is_subscribed?: parameters['rowFilter.profile.is_subscribed']
          interval?: parameters['rowFilter.profile.interval']
          stripe_customer?: parameters['rowFilter.profile.stripe_customer']
          email?: parameters['rowFilter.profile.email']
        }
        body: {
          /** profile */
          profile?: definitions['profile']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
}

export interface definitions {
  lessons: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string
    /** Format: text */
    title?: string
    /** Format: text */
    description?: string
  }
  premium_content: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `lessons.id`.<fk table='lessons' column='id'/>
     */
    id: number
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string
    /** Format: text */
    video_url?: string
  }
  profile: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string
    /** Format: boolean */
    is_subscribed?: boolean
    /** Format: text */
    interval?: string
    /** Format: text */
    stripe_customer?: string
    /** Format: text */
    email?: string
  }
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: 'params=single-object'
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none'
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: 'count=none'
  /** @description Filtering Columns */
  select: string
  /** @description On Conflict */
  on_conflict: string
  /** @description Ordering */
  order: string
  /** @description Limiting and Pagination */
  range: string
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string
  /** @description Limiting and Pagination */
  offset: string
  /** @description Limiting and Pagination */
  limit: string
  /** @description lessons */
  'body.lessons': definitions['lessons']
  /** Format: bigint */
  'rowFilter.lessons.id': string
  /** Format: timestamp with time zone */
  'rowFilter.lessons.created_at': string
  /** Format: text */
  'rowFilter.lessons.title': string
  /** Format: text */
  'rowFilter.lessons.description': string
  /** @description premium_content */
  'body.premium_content': definitions['premium_content']
  /** Format: bigint */
  'rowFilter.premium_content.id': string
  /** Format: timestamp with time zone */
  'rowFilter.premium_content.created_at': string
  /** Format: text */
  'rowFilter.premium_content.video_url': string
  /** @description profile */
  'body.profile': definitions['profile']
  /** Format: uuid */
  'rowFilter.profile.id': string
  /** Format: timestamp with time zone */
  'rowFilter.profile.created_at': string
  /** Format: boolean */
  'rowFilter.profile.is_subscribed': string
  /** Format: text */
  'rowFilter.profile.interval': string
  /** Format: text */
  'rowFilter.profile.stripe_customer': string
  /** Format: text */
  'rowFilter.profile.email': string
}

export interface operations {}

export interface external {}
