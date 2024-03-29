---
layout: default
title: "Theory and Technique of Electronic Music Notes and Math"
description: some notes and JavaScript converters accompanying the reading of Theory and Technique of Electronic Music
date: 2021-10-02
---

<html lang="en-us">
    <head>
        <meta charset="utf-8">
		<title>Music Math Helper</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body>
    <h1>Tools</h1>
    <h3>𝑓 to MIDI frequency</h3>
    <p>MIDI pitches are expressed as integers from 0 - 127.  They are calculated as a function of real-time frequency 𝑓 as:
    \[m = 69 + 12 \log_2({f \over 440})\]
    </p>
    <br>
    <form onsubmit="return fToMIDI();">
        Real time frequency, in Hz = <input type="text" id="freqf"/>
        <br>
        <input type="submit" value="Convert!"/>
        <br>
        MIDI frequency = <input type="text" id="MIDIResult" readonly/>
    </form>

    <script>
    function fToMIDI () {
    var f = parseFloat(document.getElementById("freqf").value);
    var result = parseInt(69 + (12*(Math.log2((f/440)))));
    document.getElementById("MIDIResult").value = result;
    return false; // Stop form submit
    }
    </script>

    <h3>MIDI frequency to 𝑓 </h3>

    <form onsubmit="return MIDItof();">
        MIDI frequency = <input type="text" id="MIDIfreq"/>
        <br>
        <input type="submit" value="Convert!"/>
        <br>
        Real time frequency, in Hz = <input type="text" id="fResult" readonly/>

    </form>

    <script>
    function MIDItof () {
    var MIDIfreq = parseFloat(document.getElementById("MIDIfreq").value);
    var result = 440 * 2**((MIDIfreq-69)/12);
    document.getElementById("fResult").value = result;
    return false; // Stop form submit
    }
    </script>

    <h3>Frequency Transposition</h3>

    <p>A real-time frequency 𝑓 will correspond directly to a percieved pitch, and the musical relationships betweene pitches can be expressed mathematically as so:

    \[f_t = 2^{h \over 12}f_i\]

    where \(𝑓_i\) is the initial frequency, and \(𝑓_t\) is the frequency with the halfstep relation corresponding to ℎ halfsteps.</p>
    <form onsubmit="return transposeFreq();">
        initial frequency, in Hz = <input type="text" id="initialFreq"/>
        <br>
        number of halfsteps = <input type="text" id="halfsteps"/>
        <br>
        <input type="submit" value="Convert!"/>
        <br>
        transposed frequency, in Hz = <input type="text" id="transpResult" readonly/>

    </form>

    <script>
    function transposeFreq () {
    var freq_i = parseFloat(document.getElementById("initialFreq").value);
    var h = parseFloat(document.getElementById("halfsteps").value);
    result = freq_i * 2**(h/12);
    document.getElementById("transpResult").value = result;
    return false; // Stop form submit
    }
    </script>
    <p>A full octave corresponds to twelve halfsteps, and thus increasing by ℎ = 12 halfsteps will double the initial frequency.</p>

    <h3>Transposition Formulas for Looping Wavetables</h3>

    <p>To solve the real-time frequency 𝑓 for a desired halfstep ℎ, the formula:

    \[f = {2^{h \over 12}R \over N}\]

    Conversely, to solve the number 𝑁 of samples in a wavetable to achieve ℎ from a starting frequency 𝑓:

    \[N = {2^{h \over 12}R \over f}\]

    <p>The sample rate 𝑅 is typically standardized to 44100 samples/s.</p>


    <h1>Notes</h1>

    A Sinusoid wave can be expressed as:

    \[x[n] = a cos(\omega n + \phi)\]

    where:
    𝑛 is the sample number, an integer
    𝑎 is the amplitude
    𝜔 is the angular frequency
    𝛷 is the initial phase, which may take values from -1 to 1

    Each sample is discrete and unitless, so to produce audio samples must be played at a rate and for a duration:

    \[n = Rt\]

    where:
    𝑅 is the sample rate in Hz (or \(s^{-1}\))
    𝑡 is the time in seconds (s)

    Real-time frequency may be related to sample rate and angular frequency as:

    {% raw %}\[f = {{\omega R} \over {2 \pi}}\]{% endraw %}

    where:
    𝑓 is the real-time frequency, corresponding to a pitch, in Hz (or s^(-1))
    2𝜋 is the radians conversion factor to move from angular frequency (𝜔)

    Examining the sinusoid function, note that the possible values for cos([anything]) run only from -1 to 1, so the amplitude 𝑎 is a multiplicative factor on our wave.  An increased amplitude corresponds to increaded loudness of a sound.

    The peak amplitude refers to the maximum sample value within a given window, typically understood as maximum of the absolute value (so if over the window sample values range from -10 to 2, the peak amplitude would be 10.)

    Under ordinary conditions we can take peak amplitude A(peak) = 𝑎 and root-mean squared amplitude \[A_{RMS} = {𝑎 \over \sqrt{2}}\]

    Decibels are logarithmic relative units corresponding to amplitude:

    \[d = 20 \log_{10}{a \over a_0}\]
    𝑑 = 20 log (𝑎/𝑎(0))

    where:
    𝑑 are decibels
    log is the base-10 logarithm
    𝑎(0) is the reference amplitude

    The typical reference amplitude in digital audio assumes the hardware has a maximum amplitude of 1, and takes 𝑎(0) = 10^(-5) = 0.00001

[Return to main page](/index)

