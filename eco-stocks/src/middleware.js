import { NextResponse } from 'next/server'

// Define the middleware function
// This function will be called for every request to the route defined in the config object
// It will create a random depot ID and redirect to it 
// The middleware is used to redirect before the page is rendered
export function middleware(request) {

  // Define the length of the random depot ID
  const DEPOT_ID_LENGTH = 15

  // Create a random string of a given length
  const createRandomString = (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // Create a random depot ID and redirect to it
  return NextResponse.redirect(new URL(`/${createRandomString(DEPOT_ID_LENGTH)}`, request.url  ))
}

// Define the route matcher -> this middleware will be applied to a route wiht no depot ID
export const config = {
  matcher: '/',
}