<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<xsl:apply-templates />	
</xsl:template>

<xsl:template match="info">
 <div id="info">
	<xsl:apply-templates />
 </div>
</xsl:template>

<xsl:template match="title">
 <h1><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></h1>
</xsl:template>

<xsl:template match="composer">
	<input type="text" name="composer" id="composer"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></input><br />
</xsl:template>

<xsl:template match="year">
	<span>Jahr: </span><input type="text" name="year" id="year"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></input><br />
</xsl:template>

<xsl:template match="genre">
	<span>Stil:</span><input type="text" name="genre" id="genre"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></input><br />
</xsl:template>

<xsl:template match="capo">
	<span>Kapodaster: </span><input type="text" name="capo" id="capo"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></input><span>. Bund</span><br />
</xsl:template>

<xsl:template match="key">
 <span>Tonart: </span><input type="text" name="key" id="key"> <xsl:attribute name="value"><xsl:value-of select="chord/@name" /></xsl:attribute></input>
 <select name="key_off" id="key_off" size="1">
   <xsl:attribute name="value"><xsl:value-of select="@original" /></xsl:attribute>
   <option value="0">Originaltonart</option>
   <option value="1">+1 geg. Original</option>
   <option value="2">+2 geg. Original</option>
   <option value="3">+3 geg. Original</option>
   <option value="4">+4 geg. Original</option>
   <option value="5">+5 geg. Original</option>
   <option value="6">+6 geg. Original</option>
   <option value="7">+7 geg. Original</option>
   <option value="8">+8 geg. Original</option>
   <option value="9">+9 geg. Original</option>
   <option value="10">+10 geg. Original</option>
   <option value="11">+11 geg. Original</option>
 </select><br />
</xsl:template>

<xsl:template match="beat">
	<span>Takt: </span><input type="text" name="beat" id="beat"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></input><br />
</xsl:template>

<xsl:template match="song">
 <textarea id="song" rows="10" cols="50">
	<xsl:apply-templates />
 </textarea>
</xsl:template>

<xsl:template match="stanza"><xsl:apply-templates /></xsl:template>

<xsl:template match="chord">(<xsl:value-of select="@name" />)</xsl:template>

<xsl:template match="br">
   .
</xsl:template>




<xsl:template match="node/@TEXT | text()">
  <xsl:if test="normalize-space(.)">
    <xsl:value-of select=
     "concat(normalize-space(.), '&#xA;')"/>
  </xsl:if>

  <xsl:apply-templates />
</xsl:template>

</xsl:stylesheet>

