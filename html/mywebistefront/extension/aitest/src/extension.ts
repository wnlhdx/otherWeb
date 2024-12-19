import * as vscode from 'vscode';
import axios from 'axios';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "aitest" is now active!');

    // 注册代码补全提供者
    const provider = vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            // 在输入的光标位置提供补全建议
            const completionItems: vscode.CompletionItem[] = [];

            // 添加一些示例代码补全项
            const item1 = new vscode.CompletionItem('console.log');
            item1.detail = 'Log to console';
            item1.documentation = 'Outputs a message to the console';
            item1.insertText = 'console.log($1)';
            item1.kind = vscode.CompletionItemKind.Function;

            completionItems.push(item1);

            const item2 = new vscode.CompletionItem('alert');
            item2.detail = 'Show alert message';
            item2.documentation = 'Displays an alert in the browser';
            item2.insertText = 'alert($1)';
            item2.kind = vscode.CompletionItemKind.Function;

            completionItems.push(item2);

            return completionItems;
        }
    });

    // 订阅代码补全提供者
    context.subscriptions.push(provider);
}


async function getAICodeCompletion(query: string): Promise<string> {
    // 向 AI API 请求代码补全
    const response = await axios.post('https://api.gptgod.online', {
        model: 'gpt-4-all',  // 你可以选择 OpenAI 的合适模型
        prompt: query,
        max_tokens: 50
    }, {
        headers: {
            'Authorization': `sk-OsMMq65tXdfOIlTUYtocSL7NCsmA7CerN77OkEv29dODg1EA`
        }
    });

    return response.data.choices[0].text.trim();
}

const provider = vscode.languages.registerCompletionItemProvider('javascript', {
    async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const completionItems: vscode.CompletionItem[] = [];

        const query = document.getText(document.getWordRangeAtPosition(position));
        const aiCompletion = await getAICodeCompletion(query);

        const item = new vscode.CompletionItem(aiCompletion);
        item.kind = vscode.CompletionItemKind.Text;
        completionItems.push(item);

        return completionItems;
    }
});


// This method is called when your extension is deactivated
export function deactivate() {}
