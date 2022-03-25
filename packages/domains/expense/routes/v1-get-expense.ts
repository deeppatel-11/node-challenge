import { ApiError } from '@nc/utils/errors';
import {getExpenseDetails} from '../model';
import e, { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-expense-details', async (req, res, next) => {
  const {expenseId, searchValue, orderBy, sort, page, pageSize} = req.query;
  const [expenseError, expenseDetails] = await to(getExpenseDetails(expenseId, searchValue, orderBy, sort, page, pageSize));
  retrieveData(expenseError, expenseDetails);
  
  function retrieveData(expenseError, expenseDetails){ 
    if (expenseError) {
      return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError}`, expenseError.title, req));
    }

    if (!expenseDetails) {
      return res.json({});
    }
    return res.json(secureTrim(expenseDetails));
  }
});
