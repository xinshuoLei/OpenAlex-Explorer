const connection = require('../connection')


const searchInstitutions = (field, key) => {
  const query = `SELECT display_name, type, id, works_count, cited_by_count, country
                 FROM openalex.institutions i JOIN openalex.institutions_geo ge ON i.id = ge.institution_id
                 WHERE ${field} ILIKE '%${key}%' 
                 ORDER BY (${field}  ILIKE '${key}')::integer DESC;`
  return connection.runQuery(query)
}

const getInstitutionById = (institution_id) => {
  const query = `SELECT *
                 FROM openalex.institutions i JOIN openalex.institutions_geo geo ON i.id = geo.institution_id
                 WHERE id = '${institution_id}'`
  return connection.runQuery(query)
}

const getTopAuthors = (institution_id) => {
  const query = `SELECT au.display_name, au.cited_by_count, au.id
                 FROM openalex.institutions i JOIN openalex.authors au ON i.id = au.last_known_institution
                 WHERE i.id = '${institution_id}'
                 ORDER BY au.cited_by_count DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopConcepts = (institution_id) => {
  const query = `select co.display_name, sum(w.cited_by_count), co.id
                 FROM openalex.institutions i JOIN openalex.works_authorships wa on i.id = wa.institution_id 
                 JOIN openalex.works w ON wa.work_id = w.id JOIN openalex.works_concepts wc on wc.work_id = wa.work_id 
                 JOIN openalex.concepts co ON co.id = wc.concept_id
                 WHERE i.id='${institution_id}'
                 GROUP BY co.id, co.display_name
                 ORDER BY sum(w.cited_by_count) DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopWorks = (institution_id) => {
  const query = `select co.display_name, co.id
                 FROM openalex.institutions i JOIN openalex.works_authorships wa on i.id = wa.institution_id 
                 JOIN openalex.works w ON wa.work_id = w.id
                 WHERE i.id='${institution_id}'
                 ORDER BY w.cited_by_count DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getStats = (institution_id) => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT co.works_count, co.cited_by_count, co.year
                           FROM openalex.institutions_counts_by_year co
                           WHERE co.institution_id = '${institution_id}'
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

const getTrendingInstitutions = () => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT i.id, display_name, year, co.cited_by_count, i.type
                FROM openalex.institutions i JOIN openalex.institutions_counts_by_year co on i.id = co.institution_id
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
          year_map[curr.id]["type"] = curr.type 
          year_map[curr.id][curr.year] = curr.cited_by_count
        } else {
          year_map[curr.id] = {}
          year_map[curr.id]["display_name"] = curr.display_name 
          year_map[curr.id]["type"] = curr.type 
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
      top_10.forEach(x => response.push({"id": x, "display_name": year_map[x]["display_name"], "increase": increase[x], "type": year_map[x]["type"]}))
      resolve(response)
    })
  }) 
}

module.exports = {
    searchInstitutions,
    getInstitutionById,
    getTopAuthors,
    getStats,
    getTopConcepts,
    getTopWorks,
    getTrendingInstitutions
}