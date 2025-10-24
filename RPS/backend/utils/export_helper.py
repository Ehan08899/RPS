import os
from datetime import datetime
from io import BytesIO

def generate_excel_report(members, events, attendances, month):
    """Generate Excel report matching the image format"""
    
    month_name = datetime.strptime(month + '-01', '%Y-%m-%d').strftime('%B %Y')
    export_date = datetime.now().strftime('%d %B %Y')
    
    # Create attendance lookup
    attendance_dict = {}
    for att in attendances:
        key = f"{att.anggota_id}-{att.acara_id}"
        attendance_dict[key] = att.status
    
    html = f"""
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table {{ border-collapse: collapse; width: 100%; font-family: Arial; font-size: 10pt; }}
            th, td {{ border: 1px solid black; padding: 4px 8px; text-align: center; }}
            .header {{ background-color: #f0f0f0; font-weight: bold; }}
            .hadir {{ background-color: #90EE90; }}
            .izin {{ background-color: #FFEB3B; }}
            .alfa {{ background-color: #FF6B6B; color: white; }}
            .total-row {{ background-color: #e0e0e0; font-weight: bold; }}
            .title {{ text-align: center; font-size: 14pt; font-weight: bold; margin: 10px; }}
            .date {{ text-align: right; margin: 10px; }}
        </style>
    </head>
    <body>
        <div class="date">Jakarta, {export_date}</div>
        <div class="title">LIST KEHADIRAN RIPPERSPEAR</div>
        <div class="title">Tanggal Acara Formal Bulan {month_name}</div>
        <table>
            <thead>
                <tr>
                    <th rowspan="2" class="header">No.</th>
                    <th rowspan="2" class="header">Nama Anggota</th>
    """
    
    # Event headers
    for event in events:
        event_date = event.tanggal_acara.strftime('%d %b %Y')
        html += f'<th class="header">{event_date}</th>'
    
    html += """
                    <th colspan="3" class="header">Total Akumulasi</th>
                </tr>
                <tr>
    """
    
    for _ in events:
        html += '<th class="header">PROSPECTS</th>'
    
    html += """
                    <th class="header">Hadir</th>
                    <th class="header">Izin</th>
                    <th class="header">Alfa</th>
                </tr>
            </thead>
            <tbody>
    """
    
    # Member rows
    for idx, member in enumerate(members, 1):
        hadir_count = izin_count = alfa_count = 0
        
        html += f"""
                <tr>
                    <td>{idx}</td>
                    <td style="text-align: left;">{member.nama}</td>
        """
        
        for event in events:
            key = f"{member.id}-{event.id}"
            status = attendance_dict.get(key, 'Alfa')
            
            if status == 'Hadir':
                hadir_count += 1
            elif status == 'Izin':
                izin_count += 1
            else:
                alfa_count += 1
            
            html += f'<td class="{status.lower()}">{status}</td>'
        
        html += f"""
                    <td class="hadir">{hadir_count}</td>
                    <td class="izin">{izin_count}</td>
                    <td class="alfa">{alfa_count}</td>
                </tr>
        """
    
    # Total row
    html += '<tr class="total-row"><td colspan="2">Hadir<br>Izin<br>Alfa</td>'
    
    for event in events:
        hadir = sum(1 for m in members if attendance_dict.get(f"{m.id}-{event.id}") == 'Hadir')
        izin = sum(1 for m in members if attendance_dict.get(f"{m.id}-{event.id}") == 'Izin')
        alfa = sum(1 for m in members if attendance_dict.get(f"{m.id}-{event.id}") == 'Alfa')
        html += f'<td>{hadir}<br>{izin}<br>{alfa}</td>'
    
    html += """
                <td colspan="3"></td>
            </tr>
        </tbody>
    </table>
    <div style="margin-top: 20px;">
        <p><strong>Note:</strong> Alfa tidak boleh melebihi 3 kali</p>
        <p><strong>TBA:</strong> To Be Announced</p>
    </div>
    <div style="margin-top: 40px; display: flex; justify-content: space-between;">
        <div style="text-align: center;">
            <p>Dibuat Oleh:</p><br><br><br>
            <p>____________________</p>
            <p><strong>Akil</strong></p>
            <p>Koordinator Prospect</p>
        </div>
        <div style="text-align: center;">
            <p>Penanggung Jawab:</p><br><br><br>
            <p>____________________</p>
            <p><strong>Ehan & Ica</strong></p>
            <p>Keanggotaan / Komisi Disiplin RPS</p>
        </div>
        <div style="text-align: center;">
            <p>Diketahui Oleh:</p><br><br><br>
            <p>____________________</p>
            <p><strong>Eman & Adam</strong></p>
            <p>Ketua & Wakil RPS</p>
        </div>
    </div>
    <div style="text-align: center; margin-top: 30px; font-style: italic; font-weight: bold;">
        "STRUGGLE TOGETHER"
    </div>
    </body>
    </html>
    """
    
    # === Ubah bagian ini ===
    # Simpan hasil export ke folder "export" di direktori project kamu
    export_dir = os.path.join(os.getcwd(), "export")
    os.makedirs(export_dir, exist_ok=True)

    filepath = os.path.join(export_dir, f'absensi_{month}.xls')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    
    return filepath
