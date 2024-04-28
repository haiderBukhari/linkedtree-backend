import express from 'express';
import { getPaymentHistory } from '../Controller/PaymentHistoryController.js';

const paymentHistoryRoutes = express.Router();

paymentHistoryRoutes.route('/:id').get(getPaymentHistory)

export default paymentHistoryRoutes;