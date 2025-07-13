import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../../application/services/ProductService';
import { ProductRepository } from '../../infrastructure/database/repositories/ProductRepository';
import { auth } from '../../shared/middleware/auth'; // ✔️ Corrigido caminho aqui

const router = Router();
const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.use(auth);

router.post('/', controller.create.bind(controller));
router.get('/', controller.list.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints de produtos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *     CreateProductDTO:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *     UpdateProductDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDTO'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDTO'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */

export default router;