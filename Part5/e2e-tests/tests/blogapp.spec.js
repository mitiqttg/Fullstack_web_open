const { test, expect, describe, beforeEach } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown after clicking the login button', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

});

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Deleter User',
        username: 'deleter',
        password: 'password',
      },
    });

    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: 'login' }).click();
    await page.locator('#username').fill('deleter')
    await page.locator('#password').fill('password')
    await page.getByRole('button', { name: 'login' }).click();

    const newBlog = {
      title: `Deletable Blog ${Math.floor(Math.random() * 100000)}`,
      author: 'Delete Tester',
      url: 'http://delete.blog',
    };

    await page.getByRole('button', { name: 'Add new blog' }).click();

    await page.locator('#title').fill(newBlog.title);
    await page.locator('#author').fill(newBlog.author);
    await page.locator('#url').fill(newBlog.url);
    await page.getByRole('button', { name: 'save' }).click();

    page._blogTitle = newBlog.title;
  });

  test('a blog can be deleted by the user who created it', async ({ page }) => {
    const blogTitle = page._blogTitle;

    const blogItem = page.locator('li').filter({ hasText: blogTitle });
    await blogItem.getByRole('button', { name: 'view' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure you want to delete');
      await dialog.accept();
    });

    await blogItem.getByRole('button', { name: 'delete' }).click();

    await expect(page.locator('li').filter({ hasText: blogTitle })).toHaveCount(0);
  });
});

describe('Blog delete visibility', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'User A',
        username: 'userA',
        password: 'passwordA',
      },
    })

    // Create User B (non-creator)
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'User B',
        username: 'userB',
        password: 'passwordB',
      },
    })

    await page.goto('http://localhost:5173')

    // Login as userA
    await page.getByRole('button', { name: 'login' }).click()
    await page.locator('#username').fill('userA')
    await page.locator('#password').fill('passwordA')
    await page.getByRole('button', { name: 'login' }).click()

    // Create a blog
    await page.getByRole('button', { name: 'Add new blog' }).click();
    await page.locator('#title').fill(randomTitle)
    await page.locator('#author').fill('Creator A')
    await page.locator('#url').fill('http://secret.blog')
    await page.getByRole('button', { name: 'save' }).click()

    // Logout
    await page.getByRole('button', { name: 'logout' }).click()
  })

  const randomTitle = `Secret Blog ${Math.floor(Math.random() * 100000)}`;


  test('only creator sees delete button', async ({ page }) => {
    // Login as userB (not the creator)
    await page.getByRole('button', { name: 'login' }).click()
    await page.locator('#username').fill('userB')
    await page.locator('#password').fill('passwordB')
    await page.getByRole('button', { name: 'login' }).click()

    // Locate the blog and expand it
    const blog = page.locator('li').filter({ hasText: randomTitle })
    await blog.getByRole('button', { name: 'view' }).click()

    // Ensure delete button is NOT visible
    await expect(blog.getByRole('button', { name: 'delete' })).toHaveCount(0)
  })

  test('blogs are ordered by likes in descending order', async ({ page }) => {
    // Login as userA
    await page.getByRole('button', { name: 'login' }).click();
    await page.locator('#username').fill('userA');
    await page.locator('#password').fill('passwordA');
    await page.getByRole('button', { name: 'login' }).click();

    const blogItems = page.locator('li.blog');
    const totalCount = await blogItems.count();
    const count = Math.min(totalCount, 10);

    const likesList = [];

    for (let i = 0; i < count; i++) {
      const blog = blogItems.nth(i);

      await page.evaluate((index) => {
        const blogs = document.querySelectorAll('li.blog');
        if (blogs[index]) {
          blogs[index].scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      }, i);

      // Wait for blog summary to be visible
      await expect(blog.locator('.blog-summary')).toBeVisible();

      const viewBtn = blog.getByRole('button', { name: /view|hide/i });
      const btnText = (await viewBtn.textContent())?.trim().toLowerCase();

      if (btnText === 'view') {
        await viewBtn.click();
      }

      const likesDiv = blog.locator('.blog-details > div').nth(1);
      await expect(likesDiv).toBeVisible();
      const likesText = await likesDiv.textContent();

      const match = likesText.match(/(\d+)\s+likes/);
      if (match) {
        likesList.push(Number(match[1]));
      } else {
        throw new Error(`Could not parse likes from: "${likesText}"`);
      }
    }

    const sorted = [...likesList].sort((a, b) => b - a);
    expect(likesList).toEqual(sorted);
  });

});

