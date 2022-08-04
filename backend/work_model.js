const connection = require('./connection')

const searchWork =  (field, key) => {
  const query = `SELECT id, display_name, cited_by_count, is_retracted, is_paratext, type, publication_year
                 FROM openalex.works
                 WHERE ${field} ILIKE '%${key}%' 
                 ORDER BY (${field} ILIKE '%${key}%')::integer DESC
                 LIMIT 100`
  return connection.runQuery(query)
}

const getWorkById = (work_id) => {
  const query = `SELECT *
                 FROM openalex.works
                 WHERE id = '${work_id}'`
  return connection.runQuery(query)
}

const getConcepts = (work_id) => {
  const query = `SELECT c.display_name, c.id
                 FROM openalex.works_concepts wc JOIN openalex.concepts c on c.id = wc.concept_id
                 WHERE wc.work_id ='${work_id}'
                 ORDER BY wc.score DESC
                 LIMIT 5`
  return connection.runQuery(query)
}

const getAuthors = (work_id) => {
  const query = `SELECT DISTINCT au.display_name, au.id, wa.work_id, au.works_count
                 FROM openalex.works_authorships wa JOIN openalex.authors au on wa.author_id = au.id
                 WHERE wa.work_id = '${work_id}'
                 ORDER BY au.works_count DESC`
  return connection.runQuery(query)
}

const getReferencedWork = (work_id) => {
  const query = `SELECT w.display_name, w.id
                 FROM openalex.works_referenced_works wr JOIN openalex.works w ON w.id = wr.referenced_work_id
                 WHERE wr.work_id = '${work_id}'`
  return connection.runQuery(query)
}

const getRelatedWork = (work_id) => {
  const query = `SELECT w.display_name, w.id
                 FROM openalex.works_related_works wr JOIN openalex.works w ON w.id = wr.related_work_id
                 WHERE wr.work_id = '${work_id}'`
  return connection.runQuery(query)
}

const getTopWorksSameAuthor = (authors) => {
  const query = `SELECT DISTINCT w.id, w.display_name, w.cited_by_count
                 FROM openalex.works_authorships wa JOIN openalex.works w on w.id = wa.work_id
                 WHERE wa.author_id IN (${authors})
                 ORDER BY w.cited_by_count DESC
                 LIMIT 10`
  //console.log(query)
  return connection.runQuery(query)
}

const getTopWorksSameConcept = (concepts) => {
  const query =  `SELECT DISTINCT w.id, w.display_name, w.cited_by_count
                  FROM openalex.works_concepts wc JOIN openalex.works w on w.id = wc.work_id
                  WHERE wc.concept_id IN (${concepts})
                  ORDER BY w.cited_by_count DESC
                  LIMIT 10`
  return connection.runQuery(query)
}



module.exports = {
  searchWork,
  getWorkById,
  getConcepts,
  getAuthors,
  getReferencedWork,
  getRelatedWork,
  getTopWorksSameAuthor,
  getTopWorksSameConcept
}