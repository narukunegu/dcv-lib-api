WITH S AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY Sach.[Tua] ORDER BY Sach.[So Tai san] ASC) AS RowCount
  FROM [DataThuVien].[dbo].[Sach] Sach
)

SELECT TOP 10 
        S.[So Tai san], 
        S.[Tua], 
FROM S, [DataThuVien].[dbo].[NSach] NS
WHERE 
        S.[So Tai san] = NS.MaSach
        AND RowCount = 1
        AND S.[BiaSach] IS NOT NULL
ORDER BY NS.[CapNhat] DESC
FOR JSON AUTO
