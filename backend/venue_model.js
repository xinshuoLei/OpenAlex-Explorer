const connection = require('./connection')

const searchVenues =  (field, key) => {
  const query = `SELECT id, display_name, works_count, cited_by_count, publisher, issn_l, is_oa, is_in_doaj
                 FROM openalex.venues
                 WHERE ${field} ILIKE '%${key}%' 
                 ORDER BY (${field} ILIKE '${key}')::integer DESC;`
  return connection.runQuery(query)
}

const getVenueById = (venue_id) => {
  const query = `SELECT *
                 FROM openalex.venues
                 WHERE id = '${venue_id}'`
  return connection.runQuery(query)
}

const getTopWorks = (venue_id) => {
  const query = `SELECT w.id, w.display_name, w.cited_by_count
                 FROM openalex.works w JOIN openalex.works_host_venues wv ON wv.work_id = w.id
                 WHERE wv.venue_id = '${venue_id}'
                 ORDER BY w.cited_by_count DESC
                 LIMIT 10`
  return connection.runQuery(query)
}

const getTopAuthors = (venue_id) => {
  const query =  `SELECT au.id, au.display_name, SUM(w.cited_by_count) AS works_cited_count
                  FROM openalex.works w JOIN openalex.works_host_venues wv ON wv.work_id = w.id 
                  JOIN openalex.works_authorships wa ON wa.work_id = w.id JOIN openalex.authors au ON wa.author_id = au.id
                  WHERE wv.venue_id = '${venue_id}'
                  GROUP BY au.id, au.display_name
                  ORDER BY SUM(w.cited_by_count) DESC
                  LIMIT 10`
  return connection.runQuery(query)
}


const getTrendingVenues = () => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT v.id, display_name, year, vc.cited_by_count, v.publisher
                           FROM openalex.venues v JOIN openalex.venues_counts_by_year vc on v.id = vc.venue_id
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
          year_map[curr.id]["publisher"] = curr.description 
          year_map[curr.id][curr.year] = curr.cited_by_count
        } else {
          year_map[curr.id] = {}
          year_map[curr.id]["display_name"] = curr.display_name 
          year_map[curr.id]["publisher"] = curr.description 
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
                                         "publisher": year_map[x]["publisher"]}))
      resolve(response)
    })
  }) 
}

const getStats = (venue_id) => {
  return new Promise(function(resolve, reject) {
    connection.pool.query(`SELECT co.works_count, co.cited_by_count, co.year
                          FROM openalex.venues_counts_by_year co
                          WHERE co.venue_id = '${venue_id}'
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
  searchVenues,
  getVenueById,
  getTrendingVenues,
  getTopWorks,
  getTopAuthors,
  getStats
}