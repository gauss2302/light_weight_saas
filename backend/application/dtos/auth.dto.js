/**
 * @typedef {Object} RegisterUserDto
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginDto
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthResponseDto
 * @property {string} token
 * @property {Object} user
 * @property {string} user.id
 * @property {string} user.username
 * @property {string} user.email
 */
