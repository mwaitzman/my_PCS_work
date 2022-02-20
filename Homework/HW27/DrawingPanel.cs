using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Media;
namespace Drawing {

    internal class DrawingPanel : Panel{

    static List<Line> lines;
    static Color c = Color.FromArgb(0, 0, 0);

        public DrawingPanel() {
            this.ResizeRedraw = true;
            this.DoubleBuffered = true;
        }
        protected override void OnPaint(PaintEventArgs e) {
            base.OnPaint(e);
            Graphics g = e.Graphics;
            var line = lines.last();
            g.DrawLine(new Pen(c, 2), line.x1, line.y1, line.x2, line.y2);
        }
        protected override void OnMouseDown (System.Windows.Forms.MouseEventArgs e) {
            lines.add(new Line(e.X, e.Y));
        }
        protected override void OnMouseMove (System.Windows.Forms.MouseEventArgs e) {
            lines.last().push(e.X, e.Y);
            this.invalidate();
    }
}
public class Line {
    public int x1;
    public int y1;
    public int x2;
    public int y2;

    public Line(int x1, int y1) {
        this.x1 = x1;
        this.y1 = y1;
    }
        public void push(int x2, int y2) {
        this.x2 = x2;
        this.y2 = y2;
    }
}
}
