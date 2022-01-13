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