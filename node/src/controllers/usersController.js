import bcrypt from 'bcryptjs'

import prisma from 'database/prisma'
import {
  encryptPassword,
  generateTokens,
  BadRequest,
  Deleted,
  InternalServerError,
  NotFound
} from 'helpers'

export const create = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await encryptPassword(password),
        name,
        isAdmin
      }
    })

    delete user.password

    return res.json(user)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Unique constraint failed')) {
      return BadRequest('User already registered', res)
    }
    if (errorMsg.includes('is missing')) {
      return BadRequest('Required field not provided', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const get = async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return res.json(user)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('No User found')) {
      return NotFound(errorMsg, res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const update = async (req, res) => {
  const { id } = req.query
  const { email, password, name, isAdmin } = req.body

  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        email,
        password: password ? await encryptPassword(password) : undefined,
        name,
        isAdmin
      }
    })

    delete user.password

    return res.json(user)

  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to update not found')) {
      return NotFound('User not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const remove = async (req, res) => {
  const { id } = req.query
  try {
    const user = await prisma.user.delete({
      where: { id }
    })
    if (!user) throw new Error('user not found')
    return Deleted('Successfully deleted', res)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to delete does not exist')) {
      return NotFound('User not found', res)
    }
    if (errorMsg.includes('user not found')) {
      return NotFound('User not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const login = async (req, res) => {
  console.log('inside login')
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) throw new Error('user not found')

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) throw new Error('invalid password')

    delete user.password

    return res.json({
      ...user,
      ...generateTokens({
        id: user.id,
        isAdmin: user.isAdmin
      })
    })
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('user not found')) {
      return NotFound('User not found', res)
    }
    if (errorMsg.includes('wrong password')) {
      return Unauthorized('Invalid password', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export default {
  create,
  get,
  update,
  remove,
  login
}
