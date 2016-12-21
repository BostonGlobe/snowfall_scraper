import request from 'request-promise-native'
import os from 'os'
import { dsvFormat } from 'd3-dsv'
import _ from 'lodash'

import getReportsUrl from './getReportsUrl.js'

const getReports = () =>

	new Promise((resolve, reject) => {

		getReportsUrl()
			.then(url => request(url))
			.then(body => {

				const { EOL } = os

				// Skip the first row
				const data = body.split(EOL).slice(1).join(EOL)

				// Parse pipe-delimited rows
				const rows = dsvFormat('|').parse(data)

				// Parse string to date
				const toDate = (s) => {

					const [year, month, date, hours, minutes ] = s.split(/-|\s|:/)

					return new Date(year, month - 1, date, hours, minutes)

				}

				const result = _(rows)
					// filter to 24 hours or less
					.filter(d => +d.Duration <= 24)
					// group by station id
					.groupBy('Station_Id')
					.map((values, key) =>

						_(values)
							.map(v => ({
								...v,
								date: toDate(v['DateTime_Report(UTC)']),
								Amount: +v.Amount,
								Duration: +v.Duration,
							}))
							.orderBy(['date', 'Duration'], ['desc', 'desc'])
							.map(v => _.pick(v, ['Latitude', 'Longitude', 'Amount']))
							.head())

					.filter('Amount')
					.value()

				resolve(result)

			})
			.catch(error => {

				reject(error)

			})

	})

export default getReports
