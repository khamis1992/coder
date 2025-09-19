import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Studio = ({ user }) => {
  const [activeTab, setActiveTab] = useState('code')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Welcome! How can I help you build your app today?' }
  ])

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    const userMessage = { type: 'user', content: prompt }
    setMessages(prev => [...prev, userMessage])
    setPrompt('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        content: `I'll help you build that! Let me generate the code for: "${userMessage.content}"`
      }
      setMessages(prev => [...prev, aiResponse])
      setIsGenerating(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const tabs = [
    { id: 'code', label: 'Code' },
    { id: 'diff', label: 'Diff' },
    { id: 'preview', label: 'Preview' }
  ]

  const fileTree = [
    'package.json',
    'main.dart',
    'app_router.dart',
    'lib/',
    '  components/',
    '    home_screen.dart',
    '    login_screen.dart',
    'assets/',
    '  images/',
    '  fonts/'
  ]

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Main Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1400px] mx-auto px-6 py-8">
        
        {/* Left: Assistant */}
        <section className="panel rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Assistant</h2>

          {/* Provider / Model / API */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-subtle mb-1">Provider</label>
              <select className="w-full rounded-lg input px-3 py-2 text-sm">
                <option>Deepseek</option>
                <option>Anthropic</option>
                <option>OpenAI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-subtle mb-1">Model</label>
              <select className="w-full rounded-lg input px-3 py-2 text-sm">
                <option>Deepseek-Coder</option>
                <option>Claude Sonnet 4</option>
                <option>GPT-4 Turbo</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-subtle mb-1">API Key</label>
            <input 
              type="text" 
              placeholder="Not Set (Please set via UI or ENV_VAR)"
              className="w-full rounded-lg input px-3 py-2 text-sm border-red-500/50 placeholder:text-red-400"
            />
            <a href="#" className="text-xs text-mint hover:underline mt-1 inline-block">Get API Key</a>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 mt-6 overflow-y-auto space-y-3 p-3 bg-black/20 rounded-xl text-sm min-h-[200px] max-h-[400px]">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${
                  message.type === 'user' 
                    ? 'text-mint font-medium' 
                    : 'text-subtle'
                }`}
              >
                <strong>{message.type === 'user' ? 'You: ' : 'Assistant: '}</strong>
                {message.content}
              </div>
            ))}
            {isGenerating && (
              <div className="text-subtle">
                <strong>Assistant: </strong>
                <span className="inline-flex items-center gap-1">
                  Thinking...
                  <div className="spinner"></div>
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2 text-muted">Your prompt</label>
            <div className="rounded-2xl bg-black/30 p-3 ring-1 ring-white/10">
              <textarea 
                rows="3" 
                placeholder="How can Code Launch help you today?"
                className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="btn btn-mint rounded-lg px-4 py-1.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Workbench */}
        <section className="panel rounded-2xl flex flex-col overflow-hidden">
          {/* Tabs & Actions */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            {/* Tabs */}
            <div className="flex items-center gap-4 text-sm">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab px-2 pb-2 ${
                    activeTab === tab.id ? 'active' : 'inactive'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold">
                Export ▼
              </button>
              <button className="btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold">
                Sync ▼
              </button>
              <button className="btn btn-mint px-3 py-1.5 rounded-lg text-xs font-semibold">
                Toggle Terminal
              </button>
              <button className="btn btn-mint px-3 py-1.5 rounded-full text-xs font-semibold">
                Publish
              </button>
            </div>
          </div>

          {/* Workbench Content */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* File explorer */}
            <aside className="w-full lg:w-48 border-b lg:border-b-0 lg:border-r border-white/10 p-3 text-sm">
              <p className="text-subtle mb-2">Files</p>
              <ul className="space-y-1 font-mono text-xs">
                {fileTree.map((file, index) => (
                  <li 
                    key={index} 
                    className={`hover:text-mint cursor-pointer ${
                      file.startsWith('  ') ? 'ml-4 text-subtle' : ''
                    }`}
                  >
                    {file}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Code editor */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm text-sand code-editor">
              {activeTab === 'code' && (
                <pre className="whitespace-pre-wrap">
{`// Welcome to Code Launch Studio
// Your AI-powered development environment

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Code Launch App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Code Launch'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Welcome to Code Launch!',
              style: Theme.of(context).textTheme.headline4,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Add your functionality here
              },
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
    );
  }
}`}
                </pre>
              )}
              
              {activeTab === 'diff' && (
                <div className="text-muted">
                  <p>No changes to show yet.</p>
                  <p className="mt-2">Make some edits to see the diff here.</p>
                </div>
              )}
              
              {activeTab === 'preview' && (
                <div className="text-center text-muted p-8">
                  <div className="text-4xl mb-4">📱</div>
                  <p>Preview will appear here once you build your app.</p>
                  <button className="btn btn-mint rounded-lg px-4 py-2 mt-4 text-sm font-semibold">
                    Start Preview
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div className="border-t border-white/10 p-3 font-mono text-xs terminal">
            <p className="text-mint">$ npm install</p>
            <p className="text-subtle">Installing dependencies...</p>
            <p className="text-mint">$ flutter run</p>
            <p className="text-subtle">Launching app on Chrome...</p>
            <p className="text-mint">Ready! Your app is running at http://localhost:3000</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Studio
