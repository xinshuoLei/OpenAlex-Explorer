const connection = require('./connection')

const searchConcepts =  (field, key) => {
  const query = `SELECT id, display_name, description, updated_date, works_count, cited_by_count, level
                 FROM openalex.concepts
                 WHERE ${field} ILIKE '%${key}%' 
                 ORDER BY (${field}  ILIKE '${key}')::integer DESC;`
  return connection.runQuery(query)
}

const getConceptById = (concept_id) => {
  const query = `SELECT *
                 FROM openalex.concepts
                 WHERE id = '${concept_id}'`
  return connection.runQuery(query)
}

const getAncestors = (concept_id, level) => {
  const query = `SELECT an.ancestor_id, cn.display_name, cn.level
                 FROM openalex.concepts cn JOIN openalex.concepts_ancestors an ON cn.id = an.ancestor_id
                 WHERE an.concept_id = '${concept_id}' AND cn.level=${level}`
  return connection.runQuery(query)
}

const getRelatedConcepts = (concept_id) => {
  const query = `SELECT cr.score, cn.display_name, cn.id
                 FROM openalex.concepts cn JOIN openalex.concepts_related_concepts cr ON cn.id = cr.related_concept_id
                 WHERE cr.concept_id = '${concept_id}'
                 ORDER BY cr.score DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopWorks = (concept_id) => {
  const query = `SELECT w.id,  wc.score, w.cited_by_count, w.display_name
                 FROM openalex.works w JOIN openalex.works_concepts wc ON w.id = wc.work_id
                 WHERE wc.concept_id = '${concept_id}'
                 ORDER BY wc.score*w.cited_by_count DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopVenues = (concept_id) => {
  const query = `SELECT v.id, v.display_name, SUM(w.cited_by_count) AS work_cited_by_count
                 FROM openalex.works w JOIN openalex.works_concepts wc ON w.id = wc.work_id JOIN openalex.works_host_venues wh ON wh.work_id=wc.work_id
                 JOIN openalex.venues v on v.id = wh.venue_id
                 WHERE wc.concept_id='${concept_id}'
                 GROUP BY v.id, v.display_name
                 ORDER BY SUM(w.cited_by_count) DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopInstituions = (concept_id) => {
  const query = `SELECT i.id, i.display_name, SUM(w.cited_by_count) AS work_cited_by_count
                 FROM openalex.works w JOIN openalex.works_concepts wc ON w.id = wc.work_id JOIN openalex.works_authorships wa ON wa.work_id=wc.work_id
                 JOIN openalex.institutions i on i.id = wa.institution_id
                 WHERE wc.concept_id='${concept_id}'
                 GROUP BY i.id, i.display_name
                 ORDER BY SUM(w.cited_by_count) DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopAuthors = (concept_id) => {
  const query =  `SELECT au.id, au.display_name, SUM(w.cited_by_count) as work_cited_count
                  FROM openalex.works w JOIN openalex.works_concepts wc ON w.id = wc.work_id JOIN openalex.works_authorships wa ON wa.work_id=wc.work_id
                  JOIN openalex.authors au on au.id = wa.author_id
                  WHERE wc.concept_id='${concept_id}'
                  GROUP BY au.id, au.display_name
                  ORDER BY SUM(w.cited_by_count) DESC
                  LIMIT 10`
  return connection.runQuery(query)
}


const getTrendingConcepts = () => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT c.id, display_name, year, co.cited_by_count, c.description
                FROM openalex.concepts c JOIN openalex.concepts_counts_by_year co on c.id = co.concept_id
                WHERE year=2020 OR year=2021
                ORDER BY display_name, year`, 
      (error, results) => {
      //console.log(error,results)
      if (error) {
        reject(error)
      }
      let year_map = {}
      for (let i = 0; i < results.rows.length; i++) {
        const curr = results.rows[i]
        if (curr.id in year_map) {
          year_map[curr.id]["display_name"] = curr.display_name 
          year_map[curr.id]["description"] = curr.description 
          year_map[curr.id][curr.year] = curr.cited_by_count
        } else {
          year_map[curr.id] = {}
          year_map[curr.id]["display_name"] = curr.display_name 
          year_map[curr.id]["description"] = curr.description 
          year_map[curr.id][curr.year] = curr.cited_by_count
        }
      }
      let increase = {}
      for (const id in year_map) {
        if (Object.keys(year_map[id]).length == 4) {
          increase[id] = year_map[id][2021] - year_map[id][2020]
        }
      }
      const sorted_ids = Object.keys(increase).sort(function(a, b) { return increase[b] - increase[a] }).slice(10)
      const top_10 = sorted_ids.slice(0, 10)
      const response = []
      top_10.forEach(x => response.push({"id": x, 
                                         "display_name": year_map[x]["display_name"], 
                                         "increase": increase[x], 
                                         "description": year_map[x]["description"]}))
      resolve(response)
    })
  }) 
}

const getStats = (concept_id) => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT co.works_count, co.cited_by_count, co.year, co.concept_id
                           FROM openalex.concepts_counts_by_year co
                           WHERE co.concept_id = '${concept_id}'
                           ORDER BY co.year`, 
      (error, results) => {
      //console.log(error,results)
      if (error) {
        reject(error)
      }
      console.log(results.rows)
      let years = []
      let works_count = []
      let cited_by_count = []
      results.rows.forEach(row => {
        years.push(row.year);
        works_count.push(row.works_count);
        cited_by_count.push(row.cited_by_count);
      })
      const response = {"years": years, "works_count": works_count, "cited_by_count": cited_by_count}
      console.log(response)
      resolve(response);
    })
  }) 
}

module.exports = {
  searchConcepts,
  getConceptById,
  getTrendingConcepts,
  getAncestors,
  getRelatedConcepts,
  getTopWorks,
  getTopVenues,
  getTopInstituions,
  getTopAuthors,
  getStats
}