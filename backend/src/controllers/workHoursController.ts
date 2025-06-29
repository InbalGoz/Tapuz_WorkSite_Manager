/*
export const getWorkHoursController = async (req: Request, res: Response) => {
  const employeeId = req.query.employeeId ? Number(req.query.employeeId) : undefined;
  const siteId = req.query.siteId ? Number(req.query.siteId) : undefined;
  const month = req.query.month as string | undefined;

  try {
    const data = await getFilteredWorkHours({ employeeId, siteId, month });
    res.json(data);
  } catch (err) {
    console.error("Error fetching work hours:", err);
    res.status(500).json({ message: "Server error" });
  }
};

*/
