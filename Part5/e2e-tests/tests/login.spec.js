const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Login to blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    const newUser = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpass'
    }

    await request.post('http://localhost:3003/api/users', {
      data: newUser
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown after clicking the login button', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.locator('#username')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      await page.locator('#username').fill('testuser')
      await page.locator('#password').fill('testpass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.locator('text=Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      await page.locator('#username').fill('testuser')
      await page.locator('#password').fill('wrongpass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.locator('text=Wrong username or password')).toBeVisible()
      await expect(page.locator('text=Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      const response = await request.post('http://localhost:3003/api/login', {
        data: { username: 'testuser', password: 'testpass' }
      })

      const userData = await response.json()

      await page.goto('http://localhost:5173')
      await page.evaluate((user) => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      }, userData)

      await page.reload()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Add new blog' }).click()

      await page.locator('#title').fill('Playwright E2E Blog')
      await page.locator('#author').fill('E2E Tester')
      await page.locator('#url').fill('http://e2e.blog')

      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.locator('ul.blog-list')).toContainText('Playwright E2E Blog')
      await expect(page.locator('ul.blog-list')).toContainText('E2E Tester')
    })

    test('a blog can be liked', async ({ page, request }) => {
      const loginResponse = await request.post('http://localhost:3003/api/login', {
        data: { username: 'testuser', password: 'testpass' },
      })
      const userData = await loginResponse.json()

      const randomTitle = `Likeable Blog ${Math.floor(Math.random() * 100000)}`
      const newBlog = {
        title: randomTitle,
        author: 'Like Tester',
        url: 'http://like.blog',
      }

      await request.post('http://localhost:3003/api/blogs', {
        data: newBlog,
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })

      await page.goto('http://localhost:5173')
      await page.evaluate((user) => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      }, userData)
      await page.reload()

      const blogItem = await page.locator('li', { hasText: randomTitle })

      await blogItem.getByRole('button', { name: 'view' }).click()

      await blogItem.getByRole('button', { name: 'like' }).click()

      await expect(blogItem.getByText('1 likes')).toBeVisible()
    })

  })
})
