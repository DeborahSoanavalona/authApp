"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { authClient } from '@/lib/authClient'; 

export default function SignUpPage() {
    // 1. Déclarations des états pour les champs du formulaire et les messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [image, setImage] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [loading, setLoading] = useState(false); 
    
    const router = useRouter(); 

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setMessage(''); 
        setIsSuccess(false); 
        setLoading(true); 

        try {
            // Appelle la méthode d'inscription de Better Auth Client
            await authClient.signUp.email({
                email,      
                password,   
                name,  
                image, 
                callbackURL: "/dashboard" 
            }, {
                onRequest: (ctx) => {
                    console.log('Requête d\'inscription envoyée.'); 
                },
                onSuccess: (ctx) => {
                    setMessage("Inscription réussie ! Redirection vers le tableau de bord.");                    
                    setIsSuccess(true); 
                    router.push('/dashboard'); 
                },
                onError: (ctx) => {
                    console.log("Erreur Better Auth:", ctx.error); 
                    setMessage(`Erreur d'inscription : ${ctx.error.message}.`);
                    setIsSuccess(false); 
                },
            });

        } catch (err: any) {
            setMessage(`Une erreur inattendue est survenue : ${err.message}. Veuillez réessayer.`);
            setIsSuccess(false);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>S'inscrire</h1>
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nom (Optionnel):</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL Image (Optionnel):</label>
                    <input
                        type="url"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: loading ? '#cccccc' : '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
            </form>
            {message && (
                <p 
                    style={{ 
                        marginTop: '15px', 
                        textAlign: 'center', 
                        color: isSuccess ? 'green' : 'red',
                        fontWeight: 'bold'
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
}