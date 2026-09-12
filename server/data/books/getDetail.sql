SELECT S.[Tu dien],
        S.Collection,
        S.[Tap chi], 
        S.[Chu de Tong quat], 
        S.[So Chu de], 
        S.[So Tac gia], 
        S.[So Tap], 
        S.[So Cuon], 
        S.[So Tai san], 
        S.[Tua], 
        S.[Ten Tac gia], 
        S.[Ho Tac gia], 
        S.[Dich gia], 
        S.[Lan Xb], 
        S.[Noi Xb], 
        S.[Nha Xb], 
        S.[Nam Xb], 
        S.[So trang], 
        S.[Ngay nhap], 
        S.[Ngon ngu], 
        S.[Sach co], 
        S.[Tinh trang],
        NS.[Tua],
        NS.[TenTgia],
        NS.[HoTgia],
        NS.[Chude],
        NS.[GioiThieu],
        NS.[MucLuc]
FROM [DataThuVien].[dbo].[Sach] S, [DataThuVien].[dbo].[NSach] NS
WHERE 
        S.[So Tai san] = NS.MaSach 
        AND S.[So Tai san] = @q
FOR JSON AUTO

