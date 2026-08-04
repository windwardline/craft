export type RowState = {
  id: string;
  label: string;
  owner: string;
  committed: string;
  pending?: boolean;
  rejected?: boolean;
};

export type RowAction =
  | { type: "edit"; id: string; owner: string }
  | { type: "settle"; id: string }
  | { type: "reject"; id: string };

/* The whole study in three transitions: an edit paints instantly and
   remembers what the server last confirmed; settle promotes the paint
   to truth; reject restores the confirmed value and says so. */
export function optimisticReducer(
  rows: RowState[],
  action: RowAction,
): RowState[] {
  return rows.map((row) => {
    if (row.id !== action.id) return row;
    switch (action.type) {
      case "edit":
        return {
          ...row,
          owner: action.owner,
          pending: true,
          rejected: undefined,
        };
      case "settle":
        return {
          ...row,
          committed: row.owner,
          pending: undefined,
          rejected: undefined,
        };
      case "reject":
        return {
          ...row,
          owner: row.committed,
          pending: undefined,
          rejected: true,
        };
    }
  });
}
