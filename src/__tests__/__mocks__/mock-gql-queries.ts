export const mockGQLQuery = `fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}

query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      locations
      args {
        ...InputValue
      }
    }
  }
}`;

export const minifiedMockGQLQuery =
  'fragment FullType on __Type{kind name fields(includeDeprecated:true){name args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}query IntrospectionQuery{__schema{queryType{name}mutationType{name}types{...FullType}directives{name locations args{...InputValue}}}}';

export const FormattedMockGQLQueries = {
  comments: `#comment before query
query allFilms { #comment after open curly bracket
  films(orderBy: {releaseYear: desc }) {
    id
    title
#comment between fields
    titleEN
    releaseYear #comment after field query 
    image {
      title
      url
    } #comment after close curly bracket
    #studio {
    name
  }
}
}
#comment after query`,
  arguments: `{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}`,
  aliases: `{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}`,
  operationName: `query HeroNameAndFriends {
  hero {
    name
  }
}`,
  variables: `query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
  }
}`,

  defaultVariables: `query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
  }
}`,
  directives: `query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}`,
  fragments: `query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
  
fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}`,
  inlineFragments: `query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}`,
  mutations: `mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}`,
  metaFields: `{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
  }
}`,
};

export const UnformattedMockGQLQueries = {
  comments: `#comment before query

query allFilms { #comment after open curly bracket

  films(orderBy: {releaseYear: desc }) {
    id title
#comment between fields
  titleEN
  releaseYear #comment after field query 
    image {title url} #comment after close curly bracket
    #studio {
      name
    }}}
#comment after query`,
  arguments: `{human
  (id     :   "1000"
  ) { name height (unit
:
FOOT)}}`,
  aliases: `{empireHero: hero
    (  episode    :     EMPIRE  )
  {
    name
  }
  jediHero: hero  (
    episode
    :
    JEDI  ) {name}}`,
  operationName: `query
      HeroNameAndFriends 
    {hero {name}}`,
  variables: `query HeroNameAndFriends
  ($episode:
  Episode) {
  hero 
  (episode     :  $episode ) {name}
}`,
  defaultVariables: `query HeroNameAndFriends(
  $episode: Episode 
    =
  JEDI) {
  hero(  episode  : $episode  ) {name}
}`,
  directives: `query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends 
    @include  (  if     :        $withFriends  ) {name}}}`,
  fragments: `query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {...comparisonFields}
  rightComparison: hero(episode: JEDI) {
            ...comparisonFields
  }
}
fragment comparisonFields on Character {
  name
  friendsConnection
  (first: $first) {
    totalCount
    edges {node {name}}
  }
}

`,
  inlineFragments: `query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... 
    on 
    Droid {primaryFunction}
      ...     on         Human {height}}
}`,
  mutations: `mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}`,
  metaFields: `{
  search(text: "an") {
    __typename ... on Human {
      name
    }
    ...
      on 
      Droid {
      name
    }
  }
}`,
};
