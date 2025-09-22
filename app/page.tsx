'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Recharts = dynamic(() => import('recharts'), { ssr: false })
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function Page() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/api/items?q=' + encodeURIComponent(query)).then(r => r.json()).then(d => {
      setItems(d.items || [])
      if (d.items && d.items.length && !selected) setSelected(d.items[0])
    })
  }, [query])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Tarkov Market — Starter</h1>
        </div>
        <div className="mt-4 flex gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Keresés" className="flex-1 p-2 rounded-md border" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <article key={item.id} className="bg-white rounded-2xl p-4 shadow cursor-pointer" onClick={()=>setSelected(item)}>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <img src={item.imageUrl || '/placeholder.png'} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">ID: {item.tarkovId}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.lastPrice?.toLocaleString() || '-'} ₽</div>
                    <div className="text-xs text-gray-500">Flea / NPC</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-2xl p-4 shadow">
          {selected ? (
            <div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                  <img src={selected.imageUrl || '/placeholder.png'} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{selected.name}</h2>
                  <div className="text-sm text-gray-500">Az ár: <span className="font-semibold">{selected.lastPrice?.toLocaleString() || '-'} ₽</span></div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Ártörténet</h3>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={(selected.priceHistory || []).map((p,i)=>({name: i, price: p.price}))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : <div className="text-gray-500">Válassz egy itemet a listából a részletekhez.</div>}
        </aside>
      </main>
    </div>
  )
}
