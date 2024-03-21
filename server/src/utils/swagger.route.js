/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     description: new user registretion for this site
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: Mahmoud Khalid
 *             email: user@example.com
 *             password: newPassword123
 *     responses:
 *       '200':
 *         description: user created successfully please check your email for verification
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /user/verify/{token}:
 *   get:
 *     summary: Verification token for verify account
 *     description: Verification token
 *     tags:
 *       - Authentication
 *   parameters:
 *       - in: query
 *         name: verify email
 *         description: Token for verify email
 *         required: true
 *         schema:
 *           type: string
 *   responses:
 *       '200':
 *         description: Account has been verifid, you can login now ☺
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login user to his page
 *     description: login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: user@example.com
 *             password: newPassword123
 *     responses:
 *       '200':
 *         description: after login this response will back to user
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: logout the user from the account
 *     description: logout the user
 *     tags:
 *       - Authentication
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer access token for logout
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: user logged out successfully
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example: {message: you logged out}
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/forget-password:
 *   post:
 *     summary: verify email to reset password
 *     description: verify email to get the link of reset password on this email
 *     tags:
 *       - Authentication
 *     requestBody:
 *          required: true
 *          content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  example:
 *                      email: user@example.com
 *     responses:
 *       '200':
 *         description: check email to reset password
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  example:
 *                      {message: check your email to reset your password}
 *       '401':
 *         description: your email is not correct
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/reset-password/{token}:
 *   post:
 *     summary: reset the paswword
 *     description: reset the password of the user account.
 *     tags:
 *       - Authentication
 *     security:
 *       - accessToken: []
 *
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: token had been sent in email
 *        example: "abc123!"
 *        required: true
 *        schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *                 {password: mmm123!}
 *     responses:
 *       '200':
 *         description: password has been updated
 *       '401':
 *         description: token has been expired
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/refresh-token:
 *  get:
 *      summary: refresh token after the access token expires
 *      description: this endpoint to get new access token if refresh token has been expired
 *      tags:
 *          - Authentication
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer refresh token for get new access token
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          '200':
 *              desctiption: new access token
 *              content:
 *                  application/json:
 *                      type: object
 *                      example: {accessToken: string}
 */
/**
 * @swagger
 * /update-username:
 *   put:
 *     summary: Update user addresses
 *     description: Update the addresses of the authenticated user.
 *     tags:
 *       - Authentication
 *     security:
 *       - accessToken: []
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer access token for update the username
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *             example:
 *               name:
 *                  "mahmoud khalid"
 *
 *     responses:
 *       '200':
 *         description: username has been updated successfully
 *         content:
 *           application/json:
 *              type: object
 *
 *              schema:
 *                  $ref: '#/components/schemas/Login'
 *
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /update-email:
 *   put:
 *    summary: update email.
 *    tags:
 *        - Authentication
 *    description: if the user wants to update his name from this end point he can do that.
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer access token for update the username
 *         example: "Bearer abcxyz123456"
 *         required: true
 *         schema:
 *           type: string
 *    requestBody:
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *    responses:
 *       '200':
 *         description: email has been sent to you, please check your email to verify your new one.
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  example: {message: email has been sent to you. please check your email to verify your new one}
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /update-password:
 *   put:
 *     summary: Update user password
 *     description: Update user password after authentication using a Bearer token stored in a cookie.
 *     tags:
 *       - Authentication
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         example: "Bearer abcxyz123456"
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword: string
 *               newPassword: string
 *           example:
 *             oldPassword: "string"
 *             newPassword: "string"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *          application/json:
 *              type: object
 *              example: {message: password has been updated}
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 *  /user/upload-avatar:
 *      post:
 *          summary: upload user avatar
 *          tags:
 *              - Authentication
 *          parameters:
 *              - in: headers
 *                name: Authorization
 *                description: Bearer accessToken sent to server
 *
 *          requestBody:
 *            content:
 *               multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                              format: binary
 *          responses:
 *              '200':
 *                 description: Photo uploaded successfully
 *              '400':
 *                  description: Bad request - Missing or invalid parameters
 *              '500':
 *                  description: Internal server error - Failed to upload photo
 */

/**
 * @swagger
 * /user/me:
 *  get:
 *      summary: get the information of the user
 *      description: To get the information of user
 *      tags:
 *          - Authentication
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: give me access token with Bearer key word in header
 *            example: Bearer abcdefxyz123
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      type: object
 *                      schema:
 *                            $ref: '#/components/schemas/Login'
 *          '500':
 *              description: internal server error
 *
 */

/**
 * @swagger
 * /user/auth/google:
 *  get:
 *      description: oauth with google
 *      summary: this endpoint to enter oauth interface with google
 *      tags:
 *          - Authentication
 */
/**
 * @swagger
 * /user/failure:
 *  get:
 *      description: if the user signed in with google and there is some error so this one for send failure message
 *      tags:
 *          - Authentication
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      type: object
 *                      example: {message: failure}
 */
/**
 * @swagger
 *  /user/auth/facebook:
 *      get:
 *          description: user login with facebook account
 *          tags:
 *              - Authentication
 */

// FOR ADMIN

/**
 * @swagger
 *  /user/admin:
 *   get:
 *      description: to get all users of the platform
 *      summary: admin get all users
 *      tags:
 *          - Admin
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: the access token with Bearer keyword
 *            example: Bearer abcxyz123
 *      responses:
 *          '200':
 *              description: an array that contains all users and teachers
 */

/**
 * @swagger
 *  /user/admin/{id}:
 *   get:
 *    tags:
 *      - Admin
 *    summary: admin get specific user
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the id of the user
 *        example: 123
 *      - in: header
 *        name: Authorization
 *        description: the access token with Bearer keyword
 *        example: Bearer abcxyz123
 *
 *    responses:
 *      '200':
 *          content:
 *              application/json:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      reviews:
 *                          type: string
 */
/**
 * @swagger
 *  /user/admin/{id}:
 *   delete:
 *    tags:
 *      - Admin
 *    summary: admin delete specific user
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the id of the user
 *        example: 123
 *      - in: header
 *        name: Authorization
 *        description: the access token with Bearer keyword
 *        example: Bearer abcxyz123
 *
 *    responses:
 *      '200':
 *          content:
 *              application/json:
 *                  type: object
 *                  example: {message: the user has been deleted}
 */

/**
 * @swagger
 *  /message:
 *      get:
 *          description: to get all the messages from users and clients
 *          summary: get all messages
 *          tags:
 *              - Admin
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                description: access token to check if he is the admin
 *                example: Bearer abcxyz123
 *              - in: header
 *                name: Authorization
 *                description: the access token with Bearer keyword
 *                example: Bearer abcxyz123
 *
 *          responses:
 *           '200':
 *             content:
 *               application/json:
 *                 schema:
 *                  type: array
 *                  $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *  /message/{id}:
 *   get:
 *    tags:
 *      - Admin
 *    summary: admin get specific message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the id of the user
 *        example: 123
 *      - in: header
 *        name: Authorization
 *        description: the access token with Bearer keyword
 *        example: Bearer abcxyz123
 *
 *    responses:
 *      '200':
 *          content:
 *              application/json:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          exmaple: 123
 *                      name:
 *                          type: string
 *                          example: mahmoud
 *                      email:
 *                          type: string
 *                          example: m@example.com
 *                      reviews:
 *                          type: string
 *                          exmaple: this item is good
 */
/**
 * @swagger
 *  /message/{id}:
 *   patch:
 *    tags:
 *      - Admin
 *    summary: admin read specific message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the id of the user
 *        example: 123
 *      - in: header
 *        name: Authorization
 *        description: the access token with Bearer keyword
 *        example: Bearer abcxyz123
 *
 *    responses:
 *      '200':
 *          content:
 *              application/json:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      message:
 *                          type: string
 *                      read:
 *                          type: boolean
 */

/**
 * @swagger
 *  /user/admin:
 *      post:
 *          description: add user or accept invitation for the users
 *          summary: admin add user
 *          tags:
 *              - Admin
 *          parameters:
 *              - in: headers
 *                name: Authorization
 *                description: send access token in header to check the admin status with keyword Bearer
 *                example: Bearer abcxyz123
 *
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *
 *          responses:
 *              '200':
 *                 content:
 *                  application/json:
 *                      example:
 *                          {message: user has been added successfully}
 *              '500':
 *                  description: internal server error
 *
 *
 *
 */

/**
 * @swagger
 *  /product/create-product:
 *   post:
 *      summary: admin add a new product to the site
 *      tags:
 *          - Admin
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: the access token with Bearer keyword
 *            example: Bearer abcxyz123
 *      requestBody:
 *          content:
 *               application/json:
 *                 schema:
 *                  type: array
 *                  $ref: '#/components/schemas/Message'
 *      responses:
 *          '201':
 *              content:
 *               application/json:
 *                 schema:
 *                  type: array
 *                  $ref: '#/components/schemas/Message'
 *
 */

/**
 * @swagger
 *  /product/{id}:
 *   patch:
 *      summary: admin update an existing product to the site
 *      tags:
 *          - Admin
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the product
 *            example: 123
 *          - in: header
 *            name: Authorization
 *            description: the access token with Bearer keyword
 *            example: Bearer abcxyz123
 *      requestBody:
 *          content:
 *               application/json:
 *                 schema:
 *                  type: array
 *                  $ref: '#/components/schemas/Message'
 *      responses:
 *          '201':
 *              content:
 *               application/json:
 *                 schema:
 *                  type: array
 *                  $ref: '#/components/schemas/Message'
 *
 */

/**
 * @swagger
 *  /product/{id}:
 *   delete:
 *      summary: admin delete a  product from the site
 *      tags:
 *          - Admin
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the product
 *            example: 123
 *          - in: header
 *            name: Authorization
 *            description: the access token with Bearer keyword
 *            example: Bearer abcxyz123
 *      responses:
 *          '201':
 *              content:
 *               application/json:
 *                 schema:
 *                  type: object
 *                  example: {message: product has been deleted}
 *
 */
/**
 * @swagger
 *  /product/upload-product-image/{id}:
 *   post:
 *      summary: admin add image of a product
 *      tags:
 *          - Admin
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the product
 *            example: 123
 *          - in: header
 *            name: Authorization
 *            description: the access token with Bearer keyword
 *            example: Bearer abcxyz123
 *      responses:
 *          '201':
 *              content:
 *               application/json:
 *                 schema:
 *                  type: object
 *                  example: {message: product has been deleted}
 *
 */

// FOR ALL USERS

/**
 * @swagger
 *  /message:
 *      post:
 *          description: the user send messages for give a feedback or aquirement
 *          tags:
 *               - All Users
 *          requestBody:
 *            required: true
 *            content:
 *             application/json:
 *              schema:
 *               $ref: '#/components/schemas/Message'
 *          responses:
 *              '200':
 *                 description: the response message
 *                 content:
 *                  application/json:
 *                      type: object
 *                      example: {message: your message has been sent successfully}
 *              '400':
 *                  description: bad request
 */
/**
 * @swagger
 *  /product:
 *      get:
 *          description: the user get all products of ecommerce
 *          tags:
 *              - All Users
 *          responses:
 *              '200':
 *                 description: the response message
 *                 content:
 *                  application/json:
 *                      type: Array
 *              '400':
 *                  description: bad request
 */
/**
 * @swagger
 *  /product/{id}:
 *      get:
 *          description: the user get all products of ecommerce
 *          tags:
 *              - All Users
 *          parameters:
 *              - in: path
 *                name: id
 *                description: the id of the product
 *                example: 123
 *          responses:
 *              '200':
 *                 description: the response message
 *                 content:
 *                  application/json:
 *                      type: Array
 *              '400':
 *                  description: bad request
 */

// AUTHENTICATED USER

/**
 * @swagger
 *  /product/rate/{id}:
 *      post:
 *          tags:
 *              - Authenticated user
 *          summary: user wants to rate the product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: the id of the product
 *                example: 123
 *              - in: headers
 *                name: Authorization
 *                description: the access token
 *                example: Bearer ABCxyz125..
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {rate: 4}
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {message: you rated this item}
 */
/**
 * @swagger
 *  /product/review/{id}:
 *      post:
 *          tags:
 *              - Authenticated user
 *          summary: user wants to add review to the product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: the id of the product
 *                example: 123
 *              - in: headers
 *                name: Authorization
 *                description: the access token
 *                example: Bearer ABCxyz125..
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {review: this product is wonderful}
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {review: his review}
 */
/**
 * @swagger
 *  /product/add-to-cart/{id}:
 *      post:
 *          tags:
 *              - Authenticated user
 *          summary: user wants to rate the product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: the id of the product
 *                example: 123
 *              - in: headers
 *                name: Authorization
 *                description: the access token
 *                example: Bearer ABCxyz125..
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {cart: the user cart}
 */
/**
 * @swagger
 *  /product/rate/{id}:
 *      post:
 *          tags:
 *              - Authenticated user
 *          summary: user wants to rate the product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: the id of the product
 *                example: 123
 *              - in: headers
 *                name: Authorization
 *                description: the access token
 *                example: Bearer ABCxyz125..
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {rate: 4}
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {message: you rated this item}
 */
