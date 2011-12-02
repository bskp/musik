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
 <h1><span class="edit" id="title"><xsl:value-of select="." /></span></h1>
</xsl:template>

<xsl:template match="composer">
	<h2><span class="edit" id="composer"><xsl:value-of select="." /></span></h2>
</xsl:template>

<xsl:template match="year">
	<h3><em>Jahr: </em><span class="edit" id="year"><xsl:value-of select="." /></span></h3>
</xsl:template>

<xsl:template match="key">
 <h3><em>Tonart: </em><span class="edit" id="key"><xsl:value-of select="chord/@name" /></span><span class="edit" id="key_orig"><xsl:value-of select="@original" /></span></h3>
</xsl:template>

<xsl:template match="genre">
	<h3><em>Stil:</em><span class="edit" id="genre"><xsl:value-of select="." /></span></h3>
</xsl:template>

<xsl:template match="capo">
	<h3><em>Kapo: </em><span class="edit" id="capo"><xsl:value-of select="." /></span>. Bund</h3>
</xsl:template>

<xsl:template match="beat">
	<h3><em>Takt: </em><span class="edit" id="beat"><xsl:value-of select="." /></span></h3>
</xsl:template>

<xsl:template match="song">
 <div id="song">
	<xsl:apply-templates />
 </div>
</xsl:template>

<xsl:template match="tags">
	<textarea id="tags">
		<xsl:apply-templates />
	</textarea>
</xsl:template>

<xsl:template match="tag"><xsl:value-of select="." />, </xsl:template>

<xsl:template match="stanza">
	<p class="stanza">
	<xsl:attribute name="class"><xsl:value-of select="@type" /></xsl:attribute>
	<xsl:apply-templates />
	</p>
</xsl:template>

<xsl:template match="chord">
	<span class="edit chord"><xsl:value-of select="@name" /></span>
</xsl:template>

<xsl:template match="note">
	<span class="note"><xsl:apply-templates /></span>
</xsl:template>

<xsl:template match="br">
	<br />
</xsl:template>

</xsl:stylesheet>