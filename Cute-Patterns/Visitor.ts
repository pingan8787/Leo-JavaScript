/* 场景：在线画图工具，不同节点的渲染方式，用于切换主题排版等 */
/* 1. 定义 Element 抽象元素类，即节点模型 */
interface ElementNode {
    type: string;
    data: Record<string, any>;
    accept(visitor: NodeVisitor): void;
}

/* 2. 定义 ConcreteElement 具体元素类，即常用节点类型参数 */
interface LineNodeData {
    width: number;
    color: string;
}

interface RectNodeData {
    width: number;
    height: number;
}

interface TextNodeData {
    text: string;
    color: string;
}

class LineElement implements ElementNode {
    type = 'line';
    constructor(public data: LineNodeData) { };
    accept(visitor: NodeVisitor) {
        visitor.visitorLineNode(this);
    }
}

class RectElement implements ElementNode {
    type = 'rect';
    constructor(public data: RectNodeData) { };
    accept(visitor: NodeVisitor) {
        visitor.visitorRectNode(this);
    }
}

class TextElement implements ElementNode {
    type = 'text';
    constructor(public data: TextNodeData) { };
    accept(visitor: NodeVisitor) {
        visitor.visitorTextNode(this);
    }
}

/* 3. 定义 Visitor 抽象访问者，即节点访问者模型 */
interface NodeVisitor {
    visitorLineNode(node: LineElement): void;
    visitorRectNode(node: RectElement): void;
    visitorTextNode(node: TextElement): void;
}

/* 4. 定义 ConcreteVisitor 具体访问者，即实现不同渲染方式的访问者 */
class HtmlVisitor implements NodeVisitor {
    str = '';
    visitorLineNode(node: LineElement): void {
        const { width, color } = node.data;
        this.str += `<div style="width:${width}px;color:${color}"></div>`;
    };
    visitorRectNode(node: RectElement): void {
        const { width, height } = node.data;
        this.str += `<div style="width:${width}px;height:${height}px"></div>`;
    };
    visitorTextNode(node: TextElement): void {
        const { text, color } = node.data;
        this.str += `<div style="color:${color}">${text}</div>`;
    };
}

class DarkThemeVisitor implements NodeVisitor {
    str = '';
    visitorLineNode(node: LineElement): void {
        const { width, color } = node.data;
        this.str += `<div data-theme="dark" style="width:${width}px;color:${color}"></div>`;
    };
    visitorRectNode(node: RectElement): void {
        const { width, height } = node.data;
        this.str += `<div data-theme="dark" style="width:${width}px;height:${height}px"></div>`;
    };
    visitorTextNode(node: TextElement): void {
        const { text, color } = node.data;
        this.str += `<div data-theme="dark" style="color:${color}">${text}</div>`;
    };
}

/* 5. 定义 ObjectStructure 对象接口类 */
class NodeEditor {
    nodes: Array<ElementNode> = [];
    addBlock(node: ElementNode) {
        this.nodes.push(node);
    }
    removeBlock(block: ElementNode) {
        const index = this.nodes.indexOf(block);
        index !== -1 && this.nodes.splice(index, 1);
    }
    accept(visitor: NodeVisitor) {
        this.nodes.forEach(node => {
            node.accept(visitor);
        })
    }
}

/* 5. 测试效果 */
const nodeEditor = new NodeEditor();

nodeEditor.addBlock(new LineElement({ width: 300, color: '#003399' }));
nodeEditor.addBlock(new RectElement({ width: 200, height: 50 }));
nodeEditor.addBlock(new TextElement({ text: 'hello', color: '#EE0000' }));

const htmlVisitor = new HtmlVisitor();
nodeEditor.accept(htmlVisitor);
console.log(htmlVisitor.str);
/*
"<div style="width:300px;color:#003399"></div><div style="width:200px;height:50px"></div><div style="color:#EE0000">hello</div>"
 */
const darkVisitor = new DarkThemeVisitor();
nodeEditor.accept(darkVisitor);
console.log(darkVisitor.str);
  /*
"<div data-theme="dark" style="width:300px;color:#003399"></div><div data-theme="dark" style="width:200px;height:50px"></div><div data-theme="dark" style="color:#EE0000">hello</div>" 
*/
