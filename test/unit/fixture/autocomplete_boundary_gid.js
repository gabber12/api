module.exports = {
  'query': {
    'bool': {
      'must': [{
        'constant_score': {
          'query': {
            'match': {
              'name.default': {
                'analyzer': 'peliasQueryPartialToken',
                'boost': 100,
                'query': 'test',
                'type': 'phrase',
                'operator': 'and',
                'slop': 3
              }
            }
          }
        }
      }],
      'should':[{
        'match': {
          'phrase.default': {
            'analyzer': 'peliasPhrase',
            'boost': 1,
            'slop': 3,
            'query': 'test',
            'type': 'phrase'
          }
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'population',
              'missing': 1
            },
            'weight': 3
          }]
        }
      }],
      'filter': [{
        'multi_match': {
          'fields': ['parent.*_id'],
          'query': '123'
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};