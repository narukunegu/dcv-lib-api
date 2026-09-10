SELECT S.[Chu de Tong quat], 
        S.[So Chu de], 
        S.[So Tac gia], 
        S.[So Tai san], 
        S.[Tua], 
        S.[Ten Tac gia], 
        S.[Ho Tac gia], 
        S.[Dich gia], 
        S.[Noi Xb], 
        S.[Nha Xb], 
        S.[Nam Xb], 
        S.[So trang], 
        S.[Ngon ngu], 
        S.[Tinh trang],
        NS.[Tua],
        NS.[TenTgia],
        NS.[HoTgia],
        NS.[Chude]
FROM [DataThuVien].[dbo].[Sach] S, [DataThuVien].[dbo].[NSach] NS
WHERE 
        S.[So Tai san] = NS.MaSach 
        AND NS.[Scon] LIKE N'%'+@q+'%'
FOR JSON AUTO
