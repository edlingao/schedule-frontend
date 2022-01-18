const prefix = `${process.env.REACT_APP_API}/api`
/**
 * @GET
 */
export const login = `${prefix}/user/login`

/**
 * @POST
 */
export const register = `${prefix}/user/register`

/**
 * @GET
 */
export const getSchedules = `${prefix}/schedule`

/**
 * @GET
 */
export const getSchedulesDay = (day) => `${prefix}/schedule/${day}`

/**
 * @DELETE
 */
export const deleteSchedule = (id) => `${prefix}/schedule/${id}`

/**
 * @POST
 */
export const postSchedule = `${prefix}/schedule`

/**
 * @PUT
 */
export const editSchedule = (id) => `${prefix}/schedule/${id}`

/**
 * @GET
 */
export const getTaskById = (id) => `${prefix}/task/find/${id}`

/**
 * @GET
 */
export const getTaskByTetramino = (tetraminoID) => `${prefix}/task/tetramino/${tetraminoID}`

/**
 * @GET
 */
export const getTaskByDayName = (day) => `${prefix}/task/${day}`

/**
 * @POST
 */
export const createTask = (tetraminoID) => `${prefix}/task/${tetraminoID}`

/**
 * @PUT
 */
export const editTask = (taskID) => `${prefix}/task/${taskID}`

/**
 * @DELETE
 */
 export const deleteTask = (taskID) => `${prefix}/task/${taskID}`
