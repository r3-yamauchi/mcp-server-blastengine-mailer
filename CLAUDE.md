# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは、Blastengine APIを使用してメールを送信するMCP（Model Context Protocol）サーバーです。MCPサーバーとして動作し、LLM（大規模言語モデル）がメール送信機能を利用できるようにします。

## 開発コマンド

### 依存関係のインストール
```bash
npm install
```

### ビルド
```bash
npm run build
```

### 開発モード（自動リビルド）
```bash
npm run watch
```

### デバッグ（MCPインスペクター）
```bash
npm run inspector
```

## アーキテクチャ

### 主要コンポーネント

1. **server.js**: MCPサーバーのメインエントリーポイント
   - `send_email`ツールを実装
   - BlastEngineクライアントを使用してメール送信を処理
   - STDIOトランスポートを使用してClaude Desktopと通信

### 技術スタック

- **@modelcontextprotocol/sdk**: MCPサーバーの実装に使用
- **blastengine**: メール送信APIクライアント
- **Node.js ESモジュール**: `"type": "module"`として設定

### 重要な実装詳細

1. **エラーハンドリング**: メール送信失敗時は、エラーメッセージを含むレスポンスを返します（`isError: true`）。

2. **メール送信パラメータ**:
   - `to`: 送信先メールアドレス（必須）
   - `from`: 送信元メールアドレス（必須）
   - `subject`: 件名（必須）
   - `text`: 本文（必須）

## Claude Desktop統合

このMCPサーバーをClaude Desktopで使用するには、設定ファイルにサーバー設定を追加する必要があります：

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`
