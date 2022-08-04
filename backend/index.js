const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3001
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


const concept_model = require('./concept_model')
const institutions_model = require('./institution_model')
const venue_model = require('./venue_model')
const work_model = require('./work_model')
const author_model = require('./author_model')



app.get('/institution_result', (req, res) => {
  console.log("request received")
  console.log(req.query.key)
  console.log(req.query.field)
  institutions_model.searchInstitutions(req.query.field, req.query.key)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/institution_info', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  institutions_model.getInstitutionById(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/institution_top_author', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  institutions_model.getTopAuthors(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/institution_stats', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  institutions_model.getStats(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/institution_top_concept', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  institutions_model.getTopConcepts(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/institution_top_works', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  institutions_model.getTopConcepts(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/trending_institutions', (req, res) => {
  console.log("request received")
  institutions_model.getTrendingInstitutions()
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.get('/concept_result', (req, res) => {
  console.log("request received")
  console.log(req.query.key)
  console.log(req.query.field)
  concept_model.searchConcepts(req.query.field, req.query.key)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_info', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getConceptById(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/trending_concepts', (req, res) => {
  console.log("request received")
  concept_model.getTrendingConcepts()
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_ancestors', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  console.log(req.query.level)
  concept_model.getAncestors(req.query.id, req.query.level)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_related', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getRelatedConcepts(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_top_works', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getTopWorks(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_top_venues', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getTopVenues(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_top_authors', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getTopAuthors(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_top_institutions', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getTopInstituions(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/concept_stats', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  concept_model.getStats(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/venue_result', (req, res) => {
  console.log("request received")
  console.log(req.query.key)
  console.log(req.query.field)
  venue_model.searchVenues(req.query.field, req.query.key)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/venue_info', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  venue_model.getVenueById(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/trending_venues', (req, res) => {
  console.log("request received")
  venue_model.getTrendingVenues()
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/venue_top_authors', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  venue_model.getTopAuthors(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/venue_top_works', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  venue_model.getTopWorks(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/venue_stats', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  venue_model.getStats(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_result', (req, res) => {
  console.log("request received")
  console.log(req.query.key)
  console.log(req.query.field)
  work_model.searchWork(req.query.field, req.query.key)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_info', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  work_model.getWorkById(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_author', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  work_model.getAuthors(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_concept', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  work_model.getConcepts(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_referenced', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  work_model.getReferencedWork(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_related', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  work_model.getRelatedWork(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_same_author', (req, res) => {
  console.log("request received")
  console.log(req.query.authors)
  work_model.getTopWorksSameAuthor(req.query.authors)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/work_same_concept', (req, res) => {
  console.log("request received")
  console.log(req.query.concepts)
  work_model.getTopWorksSameConcept(req.query.concepts)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.get('/author_result', (req, res) => {
  console.log("request received")
  console.log(req.query.key)
  console.log(req.query.field)
  author_model.searchAuthors(req.query.field, req.query.key)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/author_info', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  author_model.getAuthorById(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/trending_authors', (req, res) => {
  console.log("request received")
  author_model.getTrendingAuthors()
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/author_stats', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  author_model.getStats(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/author_top_concepts', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  author_model.getTopConcepts(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/author_top_works', (req, res) => {
  console.log("request received")
  console.log(req.query.id)
  author_model.getTopWorks(req.query.id)
  .then(response => {
    console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
