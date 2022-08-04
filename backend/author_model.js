const connection = require('./connection')

const searchAuthors =  (field, key) => {
  const query = `SELECT au.id, au.display_name, au.cited_by_count, au.works_count, i.display_name AS institution
                 FROM openalex.authors au JOIN openalex.institutions i ON i.id = au.last_known_institution
                 WHERE au.${field} ILIKE '%${key}%' 
                 ORDER BY (au.${field}  ILIKE '${key}')::integer DESC
                 LIMIT 100`
  return connection.runQuery(query)
}

const getAuthorById = (author_id) => {
  const query = `SELECT *
                 FROM openalex.authors
                 WHERE id = '${author_id}'`
  return connection.runQuery(query)
}

const getTopWorks = (author_id) => {
  const query = `SELECT w.id, w.display_name
                 FROM openalex.works w JOIN openalex.works_authorships wa ON wa.work_id = w.id
                 WHERE wa.author_id = '${author_id}'
                 ORDER BY w.cited_by_count DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopConcepts = (author_id) => {
  const query = `SELECT c.id, c.display_name, SUM(w.cited_by_count) AS works_cited_count
                 FROM openalex.works w JOIN openalex.works_authorships wa ON wa.work_id = w.id JOIN openalex.works_concepts wc ON w.id = wc.work_id
                 JOIN openalex.concepts c ON c.id = wc.concept_id 
                 WHERE wa.author_id = '${author_id}'
                 GROUP BY c.id, c.display_name
                 ORDER BY SUM(w.cited_by_count) DESC
                 LIMIT 10`
  return connection.runQuery(query)
}


const getTrendingAuthors = () => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT au.id, au.display_name, year, co.cited_by_count, i.display_name AS institution
                          FROM openalex.authors au JOIN openalex.authors_counts_by_year co on au.id = co.author_id 
                               JOIN openalex.institutions i ON au.last_known_institution = i.id 
                          WHERE year=2020 OR year=2021
                          ORDER BY au.display_name, year`, 
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
          year_map[curr.id]["institution"] = curr.institution 
          year_map[curr.id][curr.year] = curr.cited_by_count
        } else {
          year_map[curr.id] = {}
          year_map[curr.id]["display_name"] = curr.display_name 
          year_map[curr.id]["institution"] = curr.institution 
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
                                         "institution": year_map[x]["institution"]}))
      resolve(response)
    })
  }) 
}

const getStats = (author_id) => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT co.works_count, co.cited_by_count, co.year, co.author_id
                           FROM openalex.authors_counts_by_year co
                           WHERE co.author_id = '${author_id}'
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
  searchAuthors,
  getAuthorById,
  getTrendingAuthors,
  getStats,
  getTopWorks,
  getTopConcepts
}