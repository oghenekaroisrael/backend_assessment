exports.paginate = (model) => {
	return async (req, res, next) => {
	const pagingConfig = {
		DEFAULT_LIMIT: 5
	};
	
	const where = JSON.stringify(req.params)

	const queryString = JSON.parse(where)

	const limit = parseInt(req.query.limit) || pagingConfig.DEFAULT_LIMIT
	
    const page = parseInt(req.query.page) || 1
    const skipIndex = (page - 1) * limit
	let result = {
		data: null,
		paging: {
			total:null,
			page: null,
			totalPages: null
		}
	}
	try{
		const models = await model.find(queryString)
		.skip(skipIndex)
		.limit(limit)

		const modelsCount = await model.find(queryString).countDocuments()

		const totalPages = Math.ceil(modelsCount / limit)
		result.data = models
		result.paging.total = modelsCount
		result.paging.page = page
		result.paging.totalPages = totalPages
		
		res.paginatedResults = result
		next();
	} catch {
		return res.status(400).json({ message: `Invalid query parameters` });
	}
	}
}