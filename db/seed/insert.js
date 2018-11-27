const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'mykeyspace',
    queryOptions: {consistency: ExpressCassandra.consistencies.one}
  },
  ormOptions: {
    defaultReplicationStrategy : {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe',
  }
});

const contentModel = models.loadSchema('content', {
  fields:{
    id    : "int",
    title : "text",
    courseId : "int",
  },
  key:["id"]
});

contentModel.syncDB(function(err, result) {
  if (err) {
    throw err;
  } else {
    console.log('content model created');
  }
});

const entryModel = models.loadSchema('entry', {
  fields:{
    id    : "int",
    name : "text",
    duration : "int",
    contentId : "int",
  },
  key:["id"]
});

entryModel.syncDB(function(err, result) {
  if (err) {
    throw err;
  } else {
    console.log('entry model created');
  }
});

// COPY content(id, title, "courseId") FROM '/Users/ling/HRR/cassandra-db/db/content.csv' with HEADER = FALSE;
// COPY entry(id, name, duration, "contentId") FROM '/Users/ling/HRR/cassandra-db/db/entry.csv' with HEADER = FALSE;
