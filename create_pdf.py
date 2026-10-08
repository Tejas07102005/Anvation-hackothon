import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a')
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#059669')
    )

    heading_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0f172a')
    )

    story = []

    # Title Banner
    story.append(Paragraph("EcoCity AI — Smart Municipal Solid Waste Intelligence", title_style))
    story.append(Paragraph("Autonomous Multi-Agent AI System & Predictive Command Center | Anvation Hackathon", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#10b981'), spaceAfter=12))

    # Section 1: Executive Summary
    story.append(Paragraph("1. Executive Summary", heading_style))
    story.append(Paragraph(
        "EcoCity AI is an autonomous, real-time municipal waste management and predictive intelligence platform. "
        "Built with a <b>FastAPI Python backend</b> and a responsive <b>React/Vite frontend</b>, the platform addresses citywide waste "
        "overflows, dynamic hauler routing, landfill capacity saturation, and recycling stream segregation.", body_style))

    # Key Metrics Table
    metrics_data = [
        [Paragraph("<b>Daily Accumulation</b>", body_style), Paragraph("<b>Active Risk Sectors</b>", body_style), Paragraph("<b>Fleet Uptime</b>", body_style)],
        [Paragraph("<font color='#0f172a' size=14><b>42.8 Tons</b></font>", body_style), Paragraph("<font color='#dc2626' size=14><b>2 High Risk</b></font>", body_style), Paragraph("<font color='#059669' size=14><b>96.4% Active</b></font>", body_style)]
    ]
    t_metrics = Table(metrics_data, colWidths=[180, 180, 180])
    t_metrics.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_metrics)
    story.append(Spacer(1, 10))

    # Section 2: 6 Required MVP Screens
    story.append(Paragraph("2. Municipal Solid Waste MVP Screen Matrix", heading_style))
    
    table_data = [
        [Paragraph("<b>Screen View</b>", body_style), Paragraph("<b>Core Objective</b>", body_style), Paragraph("<b>Live Data & Inputs</b>", body_style)],
        [Paragraph("<b>1. Command Center</b>", body_style), Paragraph("Citywide Grid Map & Real-time Telemetry", body_style), Paragraph("42.8 T/day waste, 28 EV haulers, live dispatches.", body_style)],
        [Paragraph("<b>2. Waste Zones</b>", body_style), Paragraph("6-Zone Sector Risk Monitoring Matrix", body_style), Paragraph("Ind A (87%), Res B (48%), Comm C (72%), Market D (92%).", body_style)],
        [Paragraph("<b>3. Historical Analytics</b>", body_style), Paragraph("30-Day Generation Trend & Surge Forecast", body_style), Paragraph("Saturday +28.6% waste volume surge analysis.", body_style)],
        [Paragraph("<b>4. Landfill Intelligence</b>", body_style), Paragraph("Capacity Saturation & Runway Projection", body_style), Paragraph("78% capacity, 42 T intake vs 35 T compaction, 7-day runway.", body_style)],
        [Paragraph("<b>5. Collection Reliability</b>", body_style), Paragraph("Fleet Timetable & GPS Variance Tracking", body_style), Paragraph("86% on-time, 9% delayed, 5% missed; auto-rerouted V18.", body_style)],
        [Paragraph("<b>6. Source Segregation</b>", body_style), Paragraph("Stream Compliance & Contamination Audit", body_style), Paragraph("Wet (45%), Dry (35%), Mixed (20%). Flagged Market D (41%).", body_style)]
    ]

    t_screens = Table(table_data, colWidths=[120, 210, 210])
    t_screens.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_screens)
    story.append(Spacer(1, 10))

    # Section 3: EcoAgent Multi-Tool Intelligence Engine
    story.append(Paragraph("3. EcoAgent AI Multi-Tool Intelligence Engine", heading_style))
    story.append(Paragraph(
        "The autonomous co-pilot features 10 operational tools connected to FastAPI endpoints and local analytical engines:", body_style))

    tool_data = [
        [Paragraph("<b>Tool Function</b>", body_style), Paragraph("<b>Operational Specification</b>", body_style), Paragraph("<b>Execution Status</b>", body_style)],
        [Paragraph("<code>find_high_risk_zones()</code>", code_style), Paragraph("Ranks sectors by weighted multi-factor risk formula", body_style), Paragraph("<font color='#059669'><b>ACTIVE</b></font>", body_style)],
        [Paragraph("<code>get_realtime_bins()</code>", code_style), Paragraph("Queries IoT sensor telemetry across smart bins", body_style), Paragraph("<font color='#059669'><b>ACTIVE</b></font>", body_style)],
        [Paragraph("<code>predict_landfill_capacity()</code>", code_style), Paragraph("Computes excess accumulation & 7-day runway limit", body_style), Paragraph("<font color='#d97706'><b>WARNING</b></font>", body_style)],
        [Paragraph("<code>detect_collection_failures()</code>", code_style), Paragraph("Identifies GPS timetable variances and missed routes", body_style), Paragraph("<font color='#059669'><b>ACTIVE</b></font>", body_style)],
        [Paragraph("<code>optimize_vehicle_routes()</code>", code_style), Paragraph("Matches priority sectors & saves 11.4 km in transit", body_style), Paragraph("<font color='#059669'><b>ACTIVE</b></font>", body_style)],
    ]

    t_tools = Table(tool_data, colWidths=[170, 270, 100])
    t_tools.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_tools)
    story.append(Spacer(1, 12))

    # Section 4: System Architecture & API Endpoints
    story.append(Paragraph("4. System Architecture & API Integration", heading_style))
    story.append(Paragraph(
        "• <b>FastAPI Backend (Port 8000):</b> <code>/api/agent/query</code>, <code>/api/agent/tools</code>, <code>/api/dashboard</code>, <code>/api/zones</code>.<br/>"
        "• <b>React / Vite Frontend (Port 5174):</b> Minimal, mobile-responsive light UI with i18n multi-language support (English / Hindi).<br/>"
        "• <b>API Proxy & Fallback:</b> Centralized service wrapper (<code>src/services/api.js</code>) with automatic fallback to local simulation if backend is offline.", body_style))

    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0'), spaceAfter=8))
    story.append(Paragraph("<font color='#94a3b8' size=8>EcoCity AI — Municipal Solid Waste Intelligence Platform • Anvation Hackathon Documentation</font>", body_style))

    doc.build(story)
    print(f"Successfully generated {filename}!")

if __name__ == '__main__':
    generate_pdf('EcoCity_AI_Project_Documentation.pdf')
