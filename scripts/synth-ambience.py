import numpy as np, wave, sys, os
SR=22050; L=30; X=2
rng=np.random.default_rng(7)
N=(L+X)*SR
t=np.arange(N)/SR
def brown(n):
    w=rng.standard_normal(n); b=np.cumsum(w); b-=np.convolve(b,np.ones(2000)/2000,'same'); return b/np.max(np.abs(b))
def pink(n):
    f=np.fft.rfft(rng.standard_normal(n)); fr=np.fft.rfftfreq(n,1/SR); fr[0]=1; f/=np.sqrt(fr); return np.fft.irfft(f,n)/1
def bandpass(x,lo,hi):
    f=np.fft.rfft(x); fr=np.fft.rfftfreq(len(x),1/SR); f[(fr<lo)|(fr>hi)]=0; return np.fft.irfft(f,len(x))
def norm(x,peak=0.8): return x/np.max(np.abs(x))*peak
def loopify(x):
    head=x[:X*SR].copy(); tail=x[-X*SR:]; r=np.linspace(0,1,X*SR)
    y=x[:L*SR].copy(); y[:X*SR]=head*r+tail*(1-r); return y
def env(n,a,d): e=np.exp(-np.arange(n)/SR/d); e[:int(a*SR)]*=np.linspace(0,1,int(a*SR)); return e
def place(buf,ev,at):
    i=int(at*SR); j=min(len(buf),i+len(ev)); buf[i:j]+=ev[:j-i]
out=sys.argv[1]
# waves
w=bandpass(brown(N),30,1200)*0.6+bandpass(pink(N),200,4000)*0.4
swell=0.25+0.75*(0.5+0.5*np.sin(2*np.pi*t/7.5))**2.2
waves=norm(w*swell)
# cafe
murmur=bandpass(pink(N),250,2500)
mod=0.6+0.4*bandpass(rng.standard_normal(N),0.2,3)/0.05
mod=np.clip(0.7+0.3*mod/np.max(np.abs(mod)),0.3,1)
cafe=norm(murmur*mod,0.5)
for at in rng.uniform(0,L+X-1,14):
    n=int(0.6*SR); tt=np.arange(n)/SR; f=rng.uniform(2800,4200)
    ev=(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*2.7*tt))*env(n,0.002,0.08)*rng.uniform(0.08,0.18)
    place(cafe,ev,at)
cafe=norm(cafe,0.7)
# gulls
gulls=bandpass(pink(N),100,1500); gulls=norm(gulls,0.08)
for at in [1.5,2.2,2.8,9.0,9.6,17.2,17.7,18.3,24.5,25.1]:
    n=int(0.45*SR); tt=np.arange(n)/SR
    f0=1700-900*(tt/tt[-1])**0.7 + 60*np.sin(2*np.pi*22*tt)
    ph=2*np.cumsum(f0)/SR*np.pi
    ev=(np.sin(ph)+0.45*np.sin(2*ph)+0.25*np.sin(3*ph))*np.sin(np.pi*tt/tt[-1])**1.5*0.35
    place(gulls,ev,at)
gulls=norm(gulls,0.7)
# tram bells
tram=bandpass(brown(N),25,300)*0.12
for at in [3.0,3.35,15.0,15.35,15.7]:
    n=int(2.2*SR); tt=np.arange(n)/SR; f=1320
    parts=[(1,1),(2.76,0.5),(5.4,0.25),(8.93,0.12)]
    ev=sum(a*np.sin(2*np.pi*f*r*tt)*np.exp(-tt*(1.6+r*0.6)) for r,a in parts)*0.35
    place(tram,ev,at)
tram=norm(tram,0.7)
for name,x in [('atlantic-waves',waves),('cafe-terrace',cafe),('harbor-gulls',gulls),('tram-bells',tram)]:
    y=loopify(x); p=os.path.join(out,name+'.wav')
    with wave.open(p,'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes((y*32767).astype('<i2').tobytes())
print('done')
