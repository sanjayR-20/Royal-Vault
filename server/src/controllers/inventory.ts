import { Request, Response } from 'express';
import { db } from '../index';
import { jewelryItems } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await db.select().from(jewelryItems);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await db
      .select()
      .from(jewelryItems)
      .where(eq(jewelryItems.id, id))
      .limit(1);

    if (!item || item.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ item: item[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { sku, title, weightGrams, purity, rentalRatePerDay, securityDeposit } = req.body;

    if (!sku || !title || !weightGrams || !purity || !rentalRatePerDay || !securityDeposit) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newItem = await db
      .insert(jewelryItems)
      .values({
        sku,
        title,
        weightGrams,
        purity,
        rentalRatePerDay,
        securityDeposit,
      })
      .returning();

    res.json({ item: newItem[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, ...updateData } = req.body;

    const updatedItem = await db
      .update(jewelryItems)
      .set(updateData)
      .where(eq(jewelryItems.id, id))
      .returning();

    if (!updatedItem || updatedItem.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ item: updatedItem[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await db
      .delete(jewelryItems)
      .where(eq(jewelryItems.id, id))
      .returning();

    if (!deletedItem || deletedItem.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
